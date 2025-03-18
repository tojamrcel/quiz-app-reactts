import { useEffect } from "react"

export function useOnKey(key: string, handler: () => void) {
    const formatKey = (key: string) =>
        `${key[0].toUpperCase()}${key.slice(1).toLowerCase()}`

    const formattedKey = formatKey(key)

    useEffect(
        function () {
            function handleKeydown(e: KeyboardEvent) {
                if (e.key === formattedKey) handler?.()
            }

            document.addEventListener("keydown", handleKeydown)

            return () => document.removeEventListener("keydown", handleKeydown)
        },
        [formattedKey, handler],
    )
}
