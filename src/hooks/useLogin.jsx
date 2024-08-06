import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useLogin = (email, password) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        //updating state varaiables
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3000/api/users/login", {
            method : 'POST',
            headers : {
                'Content-Type' :'application/json'
            },
            body : JSON.stringify({
                email, 
                password
            })
        });

        if(response.ok){
            const json = await response.json();

            //save the user to localStorage
            localStorage.setItem('user', JSON.stringify(json.user));
            localStorage.setItem('userDetails', JSON.stringify(json.userDetails));

            //update the AuthContext
            dispatch({type : "login", payload : json });

            setIsLoading(false);

        }
        else{
            const errorData = await response.json(); 
            setIsLoading(false);
            setError(errorData);
        }
    };

  return { login, error, isLoading};
};

export default useLogin;