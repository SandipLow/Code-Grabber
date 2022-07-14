import React, {useEffect} from 'react'

const CheckAuth = () => {
    useEffect(() => {
        const authtoken = localStorage.getItem("auth-token")

        if (authtoken == undefined) {
            alert("Have to Log in first...")
            location.replace("/login");
        }
    }, [])

    return
}

export default CheckAuth
