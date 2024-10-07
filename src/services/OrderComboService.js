import axios from "axios";
import { showToast } from "~/constants";

export const allOrderByUser = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order-combo/order-by-user/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addOrderCombo = async (data, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/order-combo`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};