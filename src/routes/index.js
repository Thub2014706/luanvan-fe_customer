import BookNowPage from "~/pages/BookNowPage/BookNowPage"
import CheckoutPage from "~/pages/CheckoutPage/CheckoutPage"
import DetailFilmPage from "~/pages/DetailFilmPage/DetailFilmPage"
import HomePage from "~/pages/HomePage/HomePage"
import LoginPage from "~/pages/LoginPage/LoginPage"
import PayPage from "~/pages/PayPage/PayPage"
import SchedulePage from "~/pages/SchedulePage/SchedulePage"
import SelectSeatPage from "~/pages/SelectSeatPage/SelectSeatPage"
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
        component: BookNowPage,
    },
]

const privateRoutes = [
    {
        path: '/book-seat',
        component: SelectSeatPage,
    },
    {
        path: '/payment',
        component: PayPage,
    },
    {
        path: '/checkout',
        component: CheckoutPage,
    },
]

export {publicRoutes, privateRoutes}