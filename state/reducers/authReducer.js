
const initialState = typeof window !== 'undefined'? JSON.parse(localStorage.getItem("user")) : null;


export default (state = initialState, {type, payload}) => {
    switch (type) {

        case 'LOGIN' :
            return JSON.parse(payload);
        
        case 'LOGOUT' :
            return null;

        default:
            return state;
    }
}