import axios from 'axios';

export const detailGenre = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/genre/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const listGenre = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/genre/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
