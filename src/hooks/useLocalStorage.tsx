import { useState, useEffect } from "react"
import { Quiz } from "../types/types"

export function useLocalStorage(initialState: Quiz[], key: string) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialState
    })

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value))
        },
        [value, key],
    )

    return [value, setValue]
}
