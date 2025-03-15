import { useEffect } from "react"

export function useOnKey(key, handler) {
    const formatKey = (key) =>
        `${key[0].toUpperCase()}${key.slice(1).toLowerCase()}`

    const formattedKey = formatKey(key)

    useEffect(
        function () {
            function handleKeydown(e) {
                if (e.key === formattedKey) handler?.()
            }

            document.addEventListener("keydown", handleKeydown)

            return () => document.removeEventListener("keydown", handleKeydown)
        },
        [formattedKey, handler],
    )
}
