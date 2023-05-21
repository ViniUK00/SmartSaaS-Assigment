import axios from "axios";

export type Data = {
    id: number | undefined;
    uid: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
    phone_number: number | undefined;
    address: {
      city: string;
      street_name: string;
      street_address: string;
      zip_code: string;
      state: string;
      country: string;
      coordinates: any;
    };
  };


export const url = 'https://random-data-api.com/api/v2/users?size=30'

const fetchUserData = async (url: string) => {
    const res = await axios.get(url);
    console.table(res.data);
    
    return res.data;
}

export default fetchUserData;