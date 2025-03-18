import { Navigate } from "react-router-dom"
import { useQuizzes } from "../contexts/QuizzesContext"
import Spinner from "./Spinner"
import { ReactNode } from "react"

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { status, activeQuiz } = useQuizzes()
    const isLastQuestion =
        activeQuiz.currentQuestion + 1 === activeQuiz.questions.length

    if (status === "loading") return <Spinner />
    if (activeQuiz.id === null || !isLastQuestion) return <Navigate to="/" />

    return children
}

export default ProtectedRoute
