import axios from 'axios';

export const postUID = async (userInfo) => {
    try {
        const res = await axios.post('http://localhost:3000/post-user', { 
            'user': { 
                'id': userInfo[0], 
                'first_name': userInfo[1],
                'last_name': userInfo[2]
            } 
        })
        return res.data
    } catch (error) {
        console.error('Error Posting', error);
        throw error;
    }
};

