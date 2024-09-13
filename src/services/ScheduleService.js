import axios from 'axios';
import { showToast } from '~/constants';

export const detailSchedule = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listSchedule = async (date) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/list?date=${date}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listScheduleNotScreened = async (search) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/schedule/list-schedule-not-screened?search=${search}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
