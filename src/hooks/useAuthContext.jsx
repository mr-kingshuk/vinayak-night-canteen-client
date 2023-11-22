import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

//Custom Hook to get the AuthContext
export const useAuthContext = () =>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }

    return context;
};