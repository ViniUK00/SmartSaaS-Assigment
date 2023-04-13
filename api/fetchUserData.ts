import axios from "axios";

export interface Data {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    id: number | undefined;
    avatar: string | undefined;
    phone_number: number | undefined;
    uid: string | undefined;
}

export const url = 'https://random-data-api.com/api/v2/users?size=10'

const fetchUserData = async (url: string) => {
    const res = await axios.get(url);
    console.table(res.data);
    
    return res.data;
}

export default fetchUserData;