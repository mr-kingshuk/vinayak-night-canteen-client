import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignup = (email, password, reEnterPassword, name) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, reEnterPassword, name) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://13.232.148.171/api/users/signup", {
            method : 'POST',
            headers : {
                'Content-Type' :'application/json'
            },
            body : JSON.stringify({
                email, 
                password,
                reEnterPassword,
                name
            })
        });
        
        if(response.ok){
            const json = await response.json();

            //save the user to localStorage
            localStorage.setItem('user', JSON.stringify(json.user));
            localStorage.setItem('userDetails', JSON.stringify(json.userDetails));

            //update the AuthContext
            dispatch({type : "signup", payload : json });

            setIsLoading(false);
        }
        else{
            const errorData = await response.json(); 
            setIsLoading(false);
            setError(errorData);
        }
    };

  return { signup, isLoading, error};
};

export default useSignup;