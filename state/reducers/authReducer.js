
const initialState = typeof window !== 'undefined'? JSON.parse(localStorage.getItem("user")) : null;


export default (state = initialState, {type, payload}) => {
    switch (type) {

        case 'LOGIN' :
            localStorage.setItem("user", payload)
            return JSON.parse(payload);
        
        case 'LOGOUT' :
            localStorage.removeItem("user")
            return null;

        default:
            return state;
    }
}