import axios from "axios"
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "~/features/auth/authSlice";

axios.defaults.withCredentials = true;

export const axiosJWT = axios.create();

export const refreshToken = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh-token`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const login = async (user, toast, navigate, dispatch) => {
    dispatch(loginStart())
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, user)
        dispatch(loginSuccess(response.data))
        navigate('/');
    } catch (error) {
        dispatch(loginFailed)
        if (error.response) {
            toast(error.response.data.message, {
                position: 'top-center',
                autoClose: 2000,
                type: 'error',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            console.log(error);
            alert('Lỗi mạng');
        }
    }
}

export const logout = async (dispatch, token) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/api/user/logout`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailed());
    }
};