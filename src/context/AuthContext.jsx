import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const ACTIONS = {
    'LOGIN': 'login',
    'SIGNUP':'signup',
    'LOGOUT': 'logout',
    'UPDATE' : 'update'
}

const authReducer = (state, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return { user : action.payload.user, userDetails : action.payload.userDetails  };
        case ACTIONS.LOGOUT:         
            return { user : null, userDetails : null }
        case ACTIONS.SIGNUP:
            return {user : action.payload.user, userDetails : action.payload.userDetails};    
        case ACTIONS.UPDATE:
            const { _id, ...objectWithoutId } = action.payload;
            state = { ...state, userDetails : objectWithoutId };  
            return state;
        default: return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem('user')),
        userDetails : JSON.parse(localStorage.getItem('userDetails'))
    });

    return(
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
