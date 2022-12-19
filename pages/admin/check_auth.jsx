import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CheckAuth = () => {

    const router = useRouter()

    useEffect(() => {

        const user = localStorage.getItem("user")

        if (user == undefined) {
            alert("Have to Log in first...")
            router.push("/auth");
        }

    }, [])

    return
}

export default CheckAuth
