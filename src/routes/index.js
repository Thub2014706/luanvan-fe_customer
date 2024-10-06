import { layer } from "@fortawesome/fontawesome-svg-core"
import AccountPage from "~/pages/AccountPage/AccountPage"
import BookComboPage from "~/pages/BookComboPage/BookComboPage"
import BookNowPage from "~/pages/BookNowPage/BookNowPage"
import CheckoutPage from "~/pages/CheckoutPage/CheckoutPage"
import DetailFilmPage from "~/pages/DetailFilmPage/DetailFilmPage"
import HomePage from "~/pages/HomePage/HomePage"
import LoginPage from "~/pages/LoginPage/LoginPage"
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage"
import PayComboPage from "~/pages/PayComboPage/PayComboPage"
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
    {
        path: '/book-combo',
        component: BookComboPage,
    },
    {
        path: '/*',
        component: NotFoundPage,
        layout: null
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
        path: '/payment-combo',
        component: PayComboPage,
    },
    {
        path: '/checkout',
        component: CheckoutPage,
    },
    {
        path: '/account',
        component: AccountPage,
    },
]

export {publicRoutes, privateRoutes}