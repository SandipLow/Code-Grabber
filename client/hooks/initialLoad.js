import { useEffect, useState } from "react";

export default function useInitialLoad() {
    const [initialLoad, setInitialLoad] = useState(true)
    useEffect(()=> {
        setInitialLoad(false)
    }, [])

    return initialLoad
}