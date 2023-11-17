import { useAuthContext } from './useAuthContext';
import { useOrderContext } from './useOrderContext';

const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch : dispatchOrder } = useOrderContext();
    

    const logout = () => {
        //remove user from loaclStorage
        localStorage.removeItem('user');
        localStorage.removeItem('userDetails');
        localStorage.removeItem('order');

        //dispatch logout action
        dispatch({type: 'logout'});
        dispatchOrder({type: 'remove'});
    }
    return logout;
}

export default useLogout;