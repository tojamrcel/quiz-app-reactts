function Button({ onClick, type, children, disabled }) {
    if (type === "wide")
        return (
            <button
                disabled={disabled}
                onClick={() => onClick?.()}
                className="my-4 h-12 w-[80%] cursor-pointer rounded-md bg-violet-900 px-2 font-bold text-gray-200 transition-all duration-300 hover:bg-violet-950 md:w-[60%]"
            >
                {children}
            </button>
        )

    if (type === "full-width")
        return (
            <button
                disabled={disabled}
                onClick={() => onClick?.()}
                className="my-4 h-12 w-[80%] cursor-pointer rounded-md bg-violet-900 px-2 font-bold text-gray-200 transition-all duration-300 hover:bg-violet-950 md:w-full"
            >
                {children}
            </button>
        )

    if (type === "default" || !type)
        return (
            <button
                disabled={disabled}
                onClick={() => onClick?.()}
                className="rounded-md bg-violet-900 px-3 py-1 font-bold uppercase tracking-tight text-gray-200 transition-all duration-300 hover:cursor-pointer hover:bg-violet-950 disabled:cursor-default disabled:bg-violet-800 md:px-6 md:py-3"
            >
                {children}
            </button>
        )
}

export default Button
