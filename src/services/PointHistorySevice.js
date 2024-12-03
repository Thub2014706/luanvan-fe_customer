import axios from 'axios';
import { showToast } from '~/constants';

export const allPointHistory = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/point-history/get-all/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
