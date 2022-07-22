import React, {useEffect} from 'react'

const CheckAuth = () => {
    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user == undefined) {
            alert("Have to Log in first...")
            location.replace("/login");
        }
    }, [])

    return
}

export default CheckAuth
