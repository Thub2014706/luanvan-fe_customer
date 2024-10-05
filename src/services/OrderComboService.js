import axios from "axios";

export const allOrderByUser = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order-combo/order-by-user/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};