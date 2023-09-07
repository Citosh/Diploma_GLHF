import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import {Routes, Route} from "react-router-dom"
import { Context } from "../index"
import { publicRoutes, authRoutes, adminRoutes } from "../routes"

 
const AppRouter = observer(() => {
    const {user} = useContext(Context)
 
    return (
        <Routes>
            {user.isAdmin && adminRoutes.map(({path, Component}) =>(
                <Route key={path} path={path} element={Component}/>
            ))}

            {user.isAuth && authRoutes.map(({path, Component}) =>(
                <Route key={path} path={path} element={Component}/>
            ))}
            
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}

        </Routes>
   );
});

export default AppRouter
