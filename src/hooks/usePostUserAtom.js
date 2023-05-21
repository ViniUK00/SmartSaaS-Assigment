import { useEffect } from 'react';
import { postUID } from '../../api/postUserDataAtom'

export const usePostUserAtom = (user, mainWeather) => {
  useEffect(() => {
    if (user && mainWeather) {
      const userInfo = [user.id, user.first_name, user.last_name, user.avatar, user.weatherIcon, user.temp];
      postUID(userInfo, mainWeather)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  }, [user]);
};