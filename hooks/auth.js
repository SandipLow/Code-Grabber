import { useEffect, useState } from "react";

export function useUser() {

    const [user, setUser] = useState(null)

    useEffect(()=>{

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/getuser`, {
            method: "POST",
            headers : {
                "Accept": "*/*",
                "auth-token": JSON.parse(localStorage.getItem("user")).authtoken
            }
        }).then(res=> {
            return res.json()
        }).then(user=> {
            setUser(user)
        })

    }, [])

    return user
}