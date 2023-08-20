import React, { useContext } from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import { Context } from "../index"
import { publicRoutes, authRoutes } from "../routes"
import { MAIN_ROUTE } from "../utils/consts"
 
export default function AppRouter () {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}

             {user.isAuth == true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
        </Routes>
    )
}

