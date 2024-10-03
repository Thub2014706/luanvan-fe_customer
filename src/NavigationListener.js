import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { cancelAllHold } from './services/RedisService';
import { clearAll } from './features/cart/cartSlice';

const NavigationGuard = ({showTime}) => {
    const location = useLocation();
    const { id } = location.state || {};
    showTime(id)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [prevPath, setPrevPath] = useState(null);
    const cartTicket = useSelector((state) => state.cart.cartTicket);
    const user = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (prevPath !== '/payment' && location.pathname === '/payment' && cartTicket.seats.length === 0) {
            navigate('/checkout', { state: { timeOut: false }, replace: true });
        }

        setPrevPath(location.pathname);
    }, [location, navigate, prevPath, cartTicket.seats]);


    // console.log(location.pathname);

    useEffect(() => {
        const handleNavigation = async () => {
            if (user?.data.id) {
                if (location.pathname !== '/payment') {
                    await cancelAllHold(user?.data.id);
                    dispatch(clearAll())
                }
            }
        };

        handleNavigation();
    }, [location, user, dispatch]);

    return null;
};

export default NavigationGuard;
