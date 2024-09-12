import DetailFilmPage from "~/pages/DetailFilmPage/DetailFilmPage"
import HomePage from "~/pages/HomePage/HomePage"
import LoginPage from "~/pages/LoginPage/LoginPage"
import TheaterPage from "~/pages/TheaterPage/TheaterPage"

const publicRoutes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/sign-in',
        component: LoginPage,
        layout: null
    },
    {
        path: '/film/:id',
        component: DetailFilmPage,
    },
    {
        path: '/theater/:id',
        component: TheaterPage,
    },
]

export {publicRoutes}