import axios from 'axios';

export const postUserTimeSerries = async (data) => {
    try {
        const res = await axios.post('http://localhost:3000/user/timeseries',
        data
        )
        return res.data
        console.log(res.data);
    } catch (error) {
        console.error('Error Posting', error);
        throw error;
    }
};