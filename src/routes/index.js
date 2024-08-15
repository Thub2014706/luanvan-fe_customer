import HomePage from "~/pages/HomePage/HomePage"
import LoginPage from "~/pages/LoginPage/LoginPage"

const publicRoutes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/sign-in',
        component: LoginPage,
        layout: null
    }
]

export {publicRoutes}