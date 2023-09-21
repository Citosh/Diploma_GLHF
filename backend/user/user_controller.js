const fs = require("fs")
const path = require('path');
const User = require("../db/models/user_model")
const Info = require("../db/models/info_model")
const Data = require("../db/models/data_model")
const FileData = require("../db/models/fileData_model")
const bcrypt = require("bcrypt")
const { parsePhoneNumberFromString, format } = require("libphonenumber-js");
const { resolve } = require("dns/promises");



class UserController {

    async changeEmail(req,res){
        const {new_email, password} = req.body
        try {
            const dbUser = await User.findOne({where: {id: req.user.id}})
            const comp = bcrypt.compareSync(password, dbUser.dataValues.password)
            if(!comp){
                res.status(403).json({message: "Wrong password"})
            }
            else if(dbUser.dataValues.email == new_email){
                res.status(400).json({message: "You cannot change email to previous!"})
            }
            else {
                await User.update({email: new_email},{
                    where:{
                        id: req.user.id,
                    },
                }) 
                res.status(200).json({message: "E-mail changed successfully"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async changePass(req, res) {
        const {prev_pass, new_pass} = req.body

        try {
            const dbUser = await User.findOne({where: {id: req.user.id}})
            const isCorrectPass = bcrypt.compareSync(prev_pass, dbUser.dataValues.password)

            if(!isCorrectPass){
                res.status(400).json({message : "Wrong password"})
            }
            else if(new_pass == prev_pass) {
                res.status(400).json({message: "You cannot change password to previous!"})
            }
            else{
                bcrypt.genSalt(7, function(err, salt) {
                    if(err)
                        res.status(500).json({message: "genSalt error", error: err})
                    bcrypt.hash(new_pass, salt, async function(err, hash) {
                        if(err)
                        res.status(500).json({message: "hash error", error: err})
                        await User.update({password: hash},{
                            where:{
                                id: dbUser.dataValues.id,
                            },
                        })
                    });
                });
                res.json({message: "Password changed successfully"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async changeUserInfo(req, res) {
        const {id} = req.user
        const { companyname, phonenumber } = req.body;

        try {
          const info = await Info.findOne({ where: { userId: id } });

          if (!info) {
            return res.status(404).json({ message: 'User not found' });
          }

          if (companyname) info.companyname = companyname;
          if (phonenumber) {
            try {
                const parsedPhoneNumber = parsePhoneNumberFromString(phonenumber, 'UA');

              if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
                return res.status(400).json({ message: 'Invalid phone number' });
              }

              const formattedPhoneNumber = format(parsedPhoneNumber.number, 'E.164');

              info.phonenumber = formattedPhoneNumber;
            } catch (error) {
              return res.status(400).json({ message: 'Invalid phone number format' });
            }
          }

          await info.save();

          return res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
          return res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async setUserData(req, res) {
        const {id} = req.user
        const {name, quantity, date} = req.body
        try {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if(!datePattern.test(date)){
                res.status(400).json({message: "Invalid date format"})
            }
            else{
                await Data.create({userId: id, name:name, quantity: quantity, date: date})
                res.status(200).json({message: "Data seted successfully"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
       
    }

    async getUserData(req, res) {
        const {id} = req.user
        try {
            const data = await Data.findAll({
                where: {
                    userId: id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async setFileData(req,res) {
        const {fileObj, fileName} = req.body
        const {id} = req.user

        try {
            const jsonString = JSON.stringify(fileObj);

            const fileNameToSave = `${fileName}.json`

            const pathForCreateIfNotExists = path.join(__dirname, 'file_data', `${id}`)
            const relativePath = path.join('file_data', `${id}`, fileNameToSave)
            const filePath = path.join(__dirname, relativePath);

            await fs.promises.mkdir(pathForCreateIfNotExists,{ recursive: true }, (error) => {
                if(error.code = 'EEXIST'){
                    console.log('already exists')
                }
            })

            const userData = await FileData.findAll({where: {userId: id}})

            let alreadyExists = false
            userData.forEach(elem => {
                if(elem.dataValues.path.split('\\')[2] === fileNameToSave){
                    alreadyExists = true
                }
            })

            if(alreadyExists){
                res.status(400).json({message: "File with this name already exists!"})
            }
            else{
            await fs.promises.writeFile(filePath, jsonString, 'utf-8');
            await FileData.create({userId: id, path: relativePath})

            res.status(200).json({message: "File saved successfully"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    async getFileNames(req,res) {
        const {id} = req.user
        try {
            const fileNames = await FileData.findAll({
                where: {userId: id},
                attributes: ['path']
            })
            if(fileNames.length === 0){
                res.status(400).json({message: "You dont have any files!"})
            }
            else{
                let result = new Array()
                fileNames.forEach(elem =>{
                    result.push(elem.dataValues.path)
                })
                res.status(200).json(result)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getFileDataByName(req,res) {
        const {fileName} = req.body
        const {id} = req.user
        try {
            const fileData = await fs.promises.readFile( path.join(__dirname,'file_data', `${id}`, `${fileName}.json`),'utf8')
            res.status(200).json(fileData)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteFileByName(req,res) {
        const {fileName} = req.body
        const {id} = req.user
        try {
            const correctPath = path.join('file_data',`${id}`, `${fileName}.json`)

            await FileData.destroy({where: {path: correctPath}})
            fs.promises.unlink(path.join(__dirname,correctPath))

            res.status(200).json({message: "File deleted successufully"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}





module.exports = new UserController()