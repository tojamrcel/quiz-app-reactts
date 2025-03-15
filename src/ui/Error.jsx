import { useNavigate } from "react-router-dom"
import Button from "./Button"

function Error({ message }) {
    const navigate = useNavigate()

    return (
        <div className="my-6 flex min-h-[60dvh] items-center justify-center">
            <div className="flex max-w-[80%] flex-col items-center justify-center gap-2 rounded-xl bg-zinc-300 px-[1rem] py-[3rem] shadow-lg md:px-[6rem] md:py-[6rem]">
                <h2 className="text-3xl font-bold">{message}</h2>
                <Button
                    type="full-width"
                    onClick={() => navigate("/", { replace: true })}
                >
                    Go back to main page
                </Button>
            </div>
        </div>
    )
}

export default Error
