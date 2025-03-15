import { useNavigate } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"
import Button from "../../ui/Button.tsx"

function QuizResult() {
    const navigate = useNavigate()
    const { activeQuiz } = useQuizzes()
    const { corrects, questions } = activeQuiz

    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center font-bold text-zinc-300">
            <h2 className="text-6xl md:text-8xl">Your result is</h2>
            <span className="text-7xl font-semibold text-violet-900">
                {corrects}
                <span className="text-gray-300"> / {questions.length}</span>
            </span>
            <Button
                type="wide"
                onClick={() => navigate("/", { replace: true })}
            >
                PLAY SOME OTHER QUIZZES
            </Button>
        </div>
    )
}

export default QuizResult
