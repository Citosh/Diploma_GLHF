import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor(){
        this._isAuth = false
        this._isReg = true
        this._user = {}
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

    get isAuth (){
        return this._isAuth
    }

    get isReg(){
        return this._isReg
    }

    get user (){
        return this._user
    }
}