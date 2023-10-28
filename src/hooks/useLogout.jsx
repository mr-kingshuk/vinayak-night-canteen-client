import { useAuthContext } from './useAuthContext';
import { useWorkoutContext } from './useWorkoutContext';

const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch : dispatch_workout} = useWorkoutContext();

    const logout = () => {
        //remove user from loaclStorage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({type: 'logout'});

        //clearing the workout Global state
        dispatch_workout({type: 'setWorkouts', payload: null});
    }
    return logout;
}

export default useLogout;