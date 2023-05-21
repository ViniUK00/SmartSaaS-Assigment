import { useEffect } from 'react';
import { postUID } from '../../api/postUserData'

export const usePostUserInfo = (user, mainWeather, weatherInfo) => {
  useEffect(() => {
    if (user && mainWeather) {
      const userInfo = [user.id, user.first_name, user.last_name];
      postUID(userInfo)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
    
  }, [user.id,weatherInfo]);
};
