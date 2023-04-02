import React, { createContext, useState, useEffect } from "react";
import fetchUserData, { Data, url } from "../../api/fetchUserData";

export interface UsersContextDataType {
    usersData:Data[] | null,
    isLoading:Boolean
}

export interface UsersProviderProps {
    children: React.ReactNode;
  }


const UsersContext = createContext<UsersContextDataType>({
    usersData: [],
    isLoading: true,
  });
  

const UsersProvider: React.FC<UsersProviderProps> = ({children}) => {
    const [usersData, setUsersData] = useState<Data[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(()=>{
        fetchUserData(url).then((data)=>
        {setUsersData(data)
        setIsLoading(false)});
        },[url])

    return(
        <UsersContext.Provider value={{usersData , isLoading}}>
            {children}
        </UsersContext.Provider>
    )
    
}


export { UsersContext, UsersProvider };

