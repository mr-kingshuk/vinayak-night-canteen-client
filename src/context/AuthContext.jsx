import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const ACTIONS = {
    'LOGIN': 'login',
    'LOGOUT': 'logout',
    'UPDATE' : 'update'
}

const authReducer = (state, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return { user : action.payload,  };
        case ACTIONS.LOGOUT:         
            return { user : null, userDetails : null }
        case ACTIONS.UPDATE:
            return state;    
        default: return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userDetails : null
    });

    //empty dependency array so, it renders only once.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(user){
            dispatch({type: 'login', payload: user})
        }
    }, []);


    return(
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
