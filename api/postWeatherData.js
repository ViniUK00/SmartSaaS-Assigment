import axios from 'axios';

export const postWeather = async (weather) => {
    try {
        const res = await axios.post('http://localhost:3000/post-weather',
        weather
        )
        return res.data
    } catch (error) {
        console.error('Error Posting', error);
        throw error;
    }
};