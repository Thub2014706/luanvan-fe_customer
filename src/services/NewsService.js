import axios from 'axios';

export const listNews = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailNews = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};