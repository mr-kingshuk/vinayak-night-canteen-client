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
        user: null,
        userDetails : null
    });

    //empty dependency array so, it renders only once.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        
        if(user){
            dispatch({type: 'login', payload: { user : user, userDetails : userDetails}})
        }
    }, []);


    return(
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
