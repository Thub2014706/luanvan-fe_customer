import BookNow from "~/pages/BookNow/BookNow"
import DetailFilmPage from "~/pages/DetailFilmPage/DetailFilmPage"
import HomePage from "~/pages/HomePage/HomePage"
import LoginPage from "~/pages/LoginPage/LoginPage"
import SchedulePage from "~/pages/SchedulePage/SchedulePage"
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
    {
        path: '/schedule',
        component: SchedulePage,
    },
    {
        path: '/film',
        component: BookNow,
    },
]

export {publicRoutes}