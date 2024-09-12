import axios from 'axios';
import { showToast } from '~/constants';

export const detailPerformer = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/performer/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listPerformer = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/performer/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
