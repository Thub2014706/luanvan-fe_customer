import axios from 'axios';

export const detailStaff = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/staff/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
