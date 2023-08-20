import Auth from "./pages/Auth"
import Test from "./pages/test"
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE } from "./utils/consts"

export const authRoutes = [

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth></Auth>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth></Auth>
    },
    {
        path: MAIN_ROUTE,
        Component: <Test></Test>
    },
]