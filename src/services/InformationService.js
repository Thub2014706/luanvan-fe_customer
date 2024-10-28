import axios from 'axios';
import { setInformation } from '~/features/information/informationSlide';

export const detailInfomation = async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/information/detail`);
        dispatch(setInformation(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
