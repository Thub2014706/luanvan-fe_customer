import axios from 'axios';

export const listFilmBySchedule = async (type) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/list-by-schedule?type=${type}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const getImage = async (name) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/image/${name}`);
        return response.config.url;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailFilm = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listFilmByTheater = async (theater) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/film/list-by-theater?theater=${theater}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
