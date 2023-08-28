import Auth from "./pages/Auth"
import Test from "./pages/test"
import Profile from "./pages/Profile"
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "./utils/consts"

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        Component: <Profile></Profile>
    }
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