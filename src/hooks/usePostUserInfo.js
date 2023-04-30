import { useEffect } from 'react';
import { postUID } from '../../api/postUserData'

export const usePostUserInfo = (user, mainWeather) => {

const isClear = (weather) =>{
  return weather === "Clear"
 }
  useEffect(() => {
    if (user && isClear(mainWeather)) {
      const userInfo = [user.id, user.first_name, user.last_name];
      postUID(userInfo)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  }, [user, mainWeather]);
};
