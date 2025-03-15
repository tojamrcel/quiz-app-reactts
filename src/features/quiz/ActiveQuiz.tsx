import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"
import AnswerItem from "./AnswerItem.tsx"
import StartQuizWithId from "./StartQuizWithId.tsx"
import Spinner from "../../ui/Spinner.tsx"
import Button from "../../ui/Button.tsx"
import Error from "../../ui/Error.tsx"

function ActiveQuiz() {
    const navigate = useNavigate()
    const { quizId } = useParams()
    const { activeQuiz, dispatch, status, quizzes, stopQuiz } = useQuizzes()

    const [seconds, setSeconds] = useState(3)
    const [isRestarting, setIsRestarting] = useState(false)

    const { currentQuestion, questions, answer } = activeQuiz
    const question = questions?.at(currentQuestion)
    const quizById = !activeQuiz.id
        ? quizzes.find((quiz) => +quiz.id === +quizId)
        : null

    function handleClick(userAnswerIndex) {
        if (answer !== null || isRestarting) return
        dispatch({ type: "newAnswer", payload: userAnswerIndex })
        setSeconds(3)

        const counter = setInterval(
            () => setSeconds((seconds) => seconds - 1),
            1000,
        )

        setTimeout(function () {
            clearInterval(counter)

            if (questions.length === currentQuestion + 1)
                dispatch({
                    type: "finishQuiz",
                })
            else
                dispatch({
                    type: "nextQuestion",
                    payload: questions?.at(currentQuestion + 1).correctAnswer,
                })
        }, 3000)
    }

    function handleRestart() {
        setIsRestarting(true)
        setSeconds(3)

        const counter = setInterval(
            () => setSeconds((seconds) => seconds - 1),
            1000,
        )

        setTimeout(function () {
            clearInterval(counter)

            dispatch({
                type: "restartQuiz",
            })
            setIsRestarting(false)
        }, 3000)
    }

    return (
        <>
            {status === "active" && (
                <div className="my-4 flex min-h-[65dvh] w-full flex-col items-center justify-center gap-5 md:my-0">
                    <div className="flex w-[90%] flex-col justify-center gap-5">
                        <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
                            <span className="text-violet-900">
                                {currentQuestion + 1}.
                            </span>{" "}
                            {question.question}
                        </h2>
                        <ul className="flex flex-col gap-3 text-lg">
                            {question.answers.map((ans, i) => (
                                <AnswerItem
                                    index={i}
                                    answer={ans}
                                    key={ans}
                                    active={i === activeQuiz.answer}
                                    disabled={isRestarting}
                                    onClick={handleClick}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="flex min-w-[90%] justify-between">
                        <Button
                            disabled={answer !== null || isRestarting}
                            onClick={() => {
                                stopQuiz()
                                navigate("/")
                            }}
                        >
                            BACK
                        </Button>
                        <div className="h-2">
                            {answer !== null || isRestarting ? (
                                <p className="p-2 font-semibold text-zinc-500">
                                    {isRestarting
                                        ? `Quiz will restart in ${seconds}...`
                                        : questions.length !==
                                            currentQuestion + 1
                                          ? `Next question in ${seconds}...`
                                          : `You'll see your result in ${seconds}...`}
                                </p>
                            ) : null}
                        </div>
                        <Button
                            disabled={
                                answer !== null ||
                                isRestarting ||
                                currentQuestion === 0
                            }
                            onClick={handleRestart}
                        >
                            RESTART
                        </Button>
                    </div>
                </div>
            )}
            {status === "ready" && quizById && (
                <StartQuizWithId quiz={quizById} />
            )}
            {status === "ready" && !quizById && (
                <Error message="Quiz not found." />
            )}
            {status === "finished" && <Navigate to="/result" />}
            {status === "loading" && <Spinner />}
        </>
    )
}

export default ActiveQuiz
