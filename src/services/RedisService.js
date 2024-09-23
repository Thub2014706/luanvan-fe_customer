import axios from 'axios';

export const holdSeat = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/redis/hold-seat`, data);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const allHold = async (showTime) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/redis/all-hold?showTime=${showTime}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const cancelHold = async (data) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/redis/cancel-hold`, data);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
