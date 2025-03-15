import { useQuizzes } from "../../contexts/QuizzesContext"

function AnswerItem({ index, answer, onClick, active, disabled }) {
    const { activeQuiz } = useQuizzes()
    const { correctAnswer, answer: answered } = activeQuiz
    const classStr =
        index === correctAnswer
            ? "border-4 border-green-700"
            : "border-4 border-red-700"

    return (
        <li
            onClick={() => (!disabled ? onClick(index) : null)}
            className={`${active ? classStr : "border-transparent"} ${disabled ? "cursor-default opacity-90" : "hover:scale-[1.01]"} ${answered !== null || disabled ? "cursor-default" : "cursor-pointer"} transition-color rounded-sm border-4 bg-gray-300 px-4 py-3 shadow-md duration-200`}
        >
            <p className="font-bold text-zinc-900">{answer}</p>
        </li>
    )
}

export default AnswerItem
