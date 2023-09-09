const User = require('../db/models/user_model')
const Info = require('../db/models/info_model')
const bcrypt = require('bcrypt')
const { parsePhoneNumberFromString, format } = require('libphonenumber-js');



class UserController {

    async change_email(req,res){
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

    async change_pass(req, res) {
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
        const { id } = req.params;
        const { firstname, lastname, phonenumber } = req.body;

        try {
          const info = await Info.findOne({ where: { userId: id } });

          if (!info) {
            return res.status(404).json({ message: 'User not found' });
          }

          if (firstname) info.firstname = firstname;
          if (lastname) info.lastname = lastname;

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
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
}





module.exports = new UserController()