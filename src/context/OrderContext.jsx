import { createContext, useReducer, useEffect } from "react";

export const OrderContext = createContext();

const ACTIONS = {
    'ADD': 'add',
    'INCREMENT': 'increment',
    'DECREMENT': 'decrement',
    'REMOVE': 'remove'
}

const orderReducer = (state, action) => {
    const { orderItems } = state;
    const { payload } = action;
    switch (action.type) {
        case ACTIONS.ADD:
            return { orderItems: action.payload }
        case ACTIONS.INCREMENT:
            const item = orderItems.find(element => element._id === payload._id);
            if (item) {
                item.quantity += 1;
            }
            else {
                const newItem = { _id: payload._id, name: payload.name, price: payload.price, quantity: 1 }
                orderItems.push(newItem);
            }
            localStorage.setItem('order', JSON.stringify(orderItems));
            return { ...state, orderItems: [...orderItems] };
        case ACTIONS.DECREMENT:
            const itemIndex = orderItems.findIndex(element => element._id === payload._id);
            if (itemIndex !== -1) {
                const existingItem = orderItems[itemIndex];
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                }
                else {
                    orderItems.splice(itemIndex, 1);
                }
                localStorage.setItem('order', JSON.stringify(orderItems));
                return { ...state, orderItems: [...orderItems] };
            }
            return state;
        case ACTIONS.REMOVE:
            return { orderItems: [] };
        default:
            return state;
    }
}

export const OrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orderItems: [],
    });

    //empty dependency array so, it renders only once.
    useEffect(() => {
        let order;
        if(localStorage.getItem('order') !== undefined){
            order = JSON.parse(localStorage.getItem('order'));
        }

        if (order) {
            dispatch({ type: 'add', payload: order })
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(state.orderItems));
    }, [state.orderItems]);


    return (
        <OrderContext.Provider value={{ ...state, dispatch }}>
            {children}
        </OrderContext.Provider>
    )
}
