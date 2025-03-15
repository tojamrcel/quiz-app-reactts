import { useQuizzes } from "../../contexts/QuizzesContext"
import Button from "../../ui/Button.tsx"

function StartQuizWithId({ quiz }) {
    const { startQuiz } = useQuizzes()
    if (!quiz) return

    return (
        <div className="my-6 flex min-h-[60dvh] items-center justify-center">
            <div className="flex max-w-[80%] flex-col items-center justify-center gap-4 rounded-xl bg-zinc-300 px-[1rem] py-[3rem] shadow-lg md:px-[6rem] md:py-[6rem]">
                <h2 className="text-center text-3xl font-bold leading-9 md:text-4xl">
                    Would you like to start the{" "}
                    <span className="md:block">&quot;{quiz.title}&quot;</span>{" "}
                    quiz?
                </h2>
                <Button type="wide" onClick={() => startQuiz?.(quiz)}>
                    START QUIZ
                </Button>
            </div>
        </div>
    )
}

export default StartQuizWithId
