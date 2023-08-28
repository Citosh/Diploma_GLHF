import React, { useContext } from "react"
import {Routes, Route} from "react-router-dom"
import { Context } from "../index"
import { publicRoutes, authRoutes } from "../routes"

 
export default function AppRouter () {
    const {user} = useContext(Context)
    console.log(user)
    console.log(process.env.REACT_APP_API_URL)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}

             {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
        </Routes>
    )
}

