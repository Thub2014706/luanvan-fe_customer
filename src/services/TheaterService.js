import axios from 'axios';


export const detailTheater = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theater/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listTheater = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theater/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
