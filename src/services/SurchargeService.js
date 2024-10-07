import axios from 'axios';
import { showToast } from '~/constants';

export const detailSurcharge = async (type) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/surcharge/detail?type=${type}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailSurchargeByType = async (type) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/surcharge/detail-by-type?type=${type}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
