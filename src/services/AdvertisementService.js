import axios from 'axios';

export const listAdvertisement = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/advertisement/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};