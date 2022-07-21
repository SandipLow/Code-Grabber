
export const logIn = (userName)=> {
    return (dispatch)=> {
        dispatch({
            type : 'LOGIN',
            payload : userName
        })
    }
}


export const logOut = ()=> {
    return (dispatch)=> {
        dispatch({
            type : 'LOGOUT',
            payload : null
        })
    }
}