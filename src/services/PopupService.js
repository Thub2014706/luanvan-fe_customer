import axios from 'axios';
import { showToast } from '~/constants';

export const detailPopup = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/popup/detail`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
