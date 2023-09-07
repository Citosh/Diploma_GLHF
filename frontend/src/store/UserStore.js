import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor(){
        this._isAuth = false
        this._isReg = true
        this._user = {}
        this._isAdmin = false
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setIsReg(bool){
        this._isReg = bool
    }

    setUser(user){
        this._user = user
    }

    setIsAdmin(bool){
        this._isAdmin = bool
    }


    get isAuth (){
        return this._isAuth
    }

    get isReg(){
        return this._isReg
    }

    get isAdmin(){
        return this._isAdmin
    }

    get user (){
        return this._user
    }
}