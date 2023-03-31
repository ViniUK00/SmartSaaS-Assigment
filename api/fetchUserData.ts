import axios from "axios";

export interface Data {
    first_name: string;
    last_name: string;
    email: string;
    id: number;
    avatar: string;
    phone_number: number;
}

export const url = 'https://random-data-api.com/api/v2/users?size=5&is_xml=true'

const fetchUserData = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
}

export default fetchUserData;