import axios from 'axios';
import { showToast } from '~/constants';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
} from '~/features/auth/authSlice';
import { clearAll, clearAllCombo } from '~/features/cart/cartSlice';

// axios.defaults.withCredentials = true;

// export const axiosJWT = axios.create();

// export const refreshToken = async () => {
//     try {
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh-token`);
//         return response.data;
//     } catch (error) {
//         console.log('loi', error);
//     }
// };

export const login = async (user, navigate, dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, user);
        dispatch(loginSuccess(response.data));
        navigate('/', { replace: true });
    } catch (error) {
        dispatch(loginFailed);
        if (error.response) {
            showToast(error.response.data.message, 'error');
        } else {
            console.log(error);
            alert('Lỗi mạng');
        }
    }
};

export const register = async (user, navigate) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, user);
        showToast('Đăng ký thành công', 'error');
        navigate('/sign-in', { replace: true });
        return response.data;
    } catch (error) {
        if (error.response) {
            showToast(error.response.data.message, 'error');
        } else {
            console.log(error);
            alert('Lỗi mạng');
        }
    }
};

export const logout = async (dispatch, token, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/api/user/logout`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        dispatch(clearAll());
        dispatch(clearAllCombo());
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const detailUserById = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/detail-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateAvatar = async (formData, id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/user/avatar/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
