const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    isVerified: '',
    user_id: 0,
    isLogin: false,
    isLoading: false,
    cart: [],
}

export default (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case 'LOGIN':
            return {...state,...action.payload, isLogin: true, isLoading: false, cart: action.cart}
        case 'REGISTER':
            return {...state,...action.payload, isLogin: true, isLoading: false}
        case 'LOGOUT':
            return INITIAL_STATE
        case 'LOADING':
            return {...state, isLoading: true}
        case 'ERROR':
            return {...state, isLoading: false}
        case 'ADDTOCART':
            return {...state, cart: action.cart}
        default:
            return state
    }
}