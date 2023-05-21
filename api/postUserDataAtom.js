import axios from 'axios';

export const postUID = async (userInfo, weatherInfo) => {
    try {
        const res = await axios.post('http://localhost:3000/post-user-atom', { 
            'user': { 
                'id': userInfo[0], 
                'first_name': userInfo[1],
                'last_name': userInfo[2],
                'avatar': userInfo[3],
                'weatherIcon': userInfo[4],
                'temp': userInfo[5],
            },
            'weather': weatherInfo
        })
        return res.data
    } catch (error) {
        console.error('Error Posting', error);
        throw error;
    }
};
