import { OrderContext } from "../context/OrderContext";
import { useContext } from "react";

//Custom Hook to get the AuthContext
export const useOrderContext = () =>{
    const context = useContext(OrderContext);

    if(!context){
        throw Error('useOrderContext must be used inside an AuthContextProvider');
    }

    return context;
};