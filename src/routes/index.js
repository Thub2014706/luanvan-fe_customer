import { layer } from "@fortawesome/fontawesome-svg-core"
import ChatBot from "~/components/ChatBot/ChatBot"
import AccountPage from "~/pages/AccountPage/AccountPage"
import BookComboPage from "~/pages/BookComboPage/BookComboPage"
import BookNowPage from "~/pages/BookNowPage/BookNowPage"
import CheckoutPage from "~/pages/CheckoutPage/CheckoutPage"
import DetailEventPage from "~/pages/DetailEventPage/DetailEventPage"
import DetailFilmPage from "~/pages/DetailFilmPage/DetailFilmPage"
import DetailNews from "~/pages/DetailNews/DetailNews"
import EventPage from "~/pages/EventPage/EventPage"
import HomePage from "~/pages/HomePage/HomePage"
import LoginPage from "~/pages/LoginPage/LoginPage"
import NewsPage from "~/pages/NewsPage/NewsPage"
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage"
import PayComboPage from "~/pages/PayComboPage/PayComboPage"
import PayPage from "~/pages/PayPage/PayPage"
import SchedulePage from "~/pages/SchedulePage/SchedulePage"
import SearchPage from "~/pages/SearchPage/SearchPage"
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
        path: '/sign-up',
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
        path: '/event',
        component: EventPage,
    },
    {
        path: '/event/:id',
        component: DetailEventPage,
    },
    {
        path: '/news',
        component: NewsPage,
    },
    {
        path: '/news/:id',
        component: DetailNews,
    },
    {
        path: '/chat',
        component: ChatBot,
    },
    {
        path: '/search',
        component: SearchPage,
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