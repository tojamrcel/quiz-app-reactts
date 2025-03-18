import { useEffect, useRef } from "react"
import Input from "../../ui/Input.tsx"
import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    useWatch,
} from "react-hook-form"
import { Question } from "../../types/types.ts"

interface QuestionFormProps {
    question: Question | null | undefined
    questionNum: number
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    handleDelete: () => void
    numOfQuestions: number
    setValue: UseFormSetValue<FieldValues>
    control: Control
    getValues: UseFormGetValues<FieldValues>
}

function QuestionForm({
    question,
    questionNum,
    register,
    errors,
    handleDelete,
    numOfQuestions,
    setValue,
    control,
    getValues,
}: QuestionFormProps) {
    const ref = useRef<HTMLLIElement>(null)
    const answerFieldNames = [
        `${questionNum}-answer-0`,
        `${questionNum}-answer-1`,
        `${questionNum}-answer-2`,
        `${questionNum}-answer-3`,
    ]
    const values = useWatch({
        control,
        name: answerFieldNames,
    })

    useEffect(
        function () {
            if (question || numOfQuestions === 1) return
            ref.current?.scrollIntoView({ behavior: "smooth" })
        },
        [question, numOfQuestions],
    )

    function isUniqueValidation(numField: number, value: string) {
        const answers = answerFieldNames.map((name) => getValues(name))

        const validatedArr = answers.map((ans, i) => {
            if (i === numField) return
            return value === ans
        })

        return !validatedArr.includes(true) || "Values have to be unique!"
    }

    return (
        <li
            ref={ref}
            className={`${questionNum !== 0 ? "border-t-[1px] py-2" : ""} border-gray-200 px-2`}
        >
            <div className="ml-2 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <label htmlFor="question" className="-ml-2 text-lg">
                        Question {questionNum + 1}
                    </label>
                    {numOfQuestions !== 1 &&
                    questionNum + 1 === numOfQuestions ? (
                        <button
                            onClick={() => {
                                answerFieldNames.forEach((name) =>
                                    setValue(name, ""),
                                )

                                setValue(`${questionNum}-question`, "")
                                setValue(`${questionNum}-correctAnswer`, "0")
                                handleDelete()
                            }}
                            className="flex h-2 w-2 items-center justify-center rounded-full p-[12px] text-lg text-zinc-600 transition-colors duration-300 hover:bg-gray-200"
                        >
                            -
                        </button>
                    ) : null}
                </div>
                <Input
                    defaultValue={question ? question.question : ""}
                    variation="sm"
                    register={register(`${questionNum}-question`, {
                        required: "This field is required.",
                    })}
                />

                <div className="-my-1 mb-4 h-2">
                    {errors[`${questionNum}-question`]?.message ? (
                        <span className="text-sm text-red-800">
                            {errors[
                                `${questionNum}-question`
                            ]?.message?.toString()}
                        </span>
                    ) : null}
                </div>
                <label htmlFor="answers" className="text-base">
                    Answers
                </label>
                <div className="flex items-center gap-2">
                    <span>1.</span>
                    <Input
                        maxChar={32}
                        variation="sm"
                        defaultValue={question ? question.answers[0] : ""}
                        register={register(`${questionNum}-answer-0`, {
                            required: "This field is required.",
                            validate: (value) => isUniqueValidation(0, value),
                        })}
                    />
                    <div className="-my-1 mb-4 h-2">
                        {errors[`${questionNum}-answer-0`]?.message ? (
                            <span className="text-sm text-red-800">
                                {errors[
                                    `${questionNum}-answer-0`
                                ]?.message?.toString()}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>2.</span>
                    <Input
                        defaultValue={question ? question.answers[1] : ""}
                        maxChar={32}
                        variation="sm"
                        register={register(`${questionNum}-answer-1`, {
                            required: "This field is required.",
                            validate: (value) => isUniqueValidation(1, value),
                        })}
                    />
                    <div className="-my-1 mb-4 h-2">
                        {errors[`${questionNum}-answer-1`]?.message ? (
                            <span className="text-sm text-red-800">
                                {errors[
                                    `${questionNum}-answer-1`
                                ]?.message?.toString()}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>3.</span>
                    <Input
                        defaultValue={question ? question.answers[2] : ""}
                        maxChar={32}
                        variation="sm"
                        register={register(`${questionNum}-answer-2`, {
                            required: "This field is required.",
                            validate: (value) => isUniqueValidation(2, value),
                        })}
                    />
                    <div className="-my-1 mb-4 h-2">
                        {errors[`${questionNum}-answer-2`]?.message ? (
                            <span className="text-sm text-red-800">
                                {errors[
                                    `${questionNum}-answer-2`
                                ]?.message?.toString()}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>4.</span>
                    <Input
                        defaultValue={question ? question.answers[3] : ""}
                        maxChar={32}
                        variation="sm"
                        register={register(`${questionNum}-answer-3`, {
                            required: "This field is required.",
                            validate: (value) => isUniqueValidation(3, value),
                        })}
                    />
                    <div className="-my-1 mb-4 h-2">
                        {errors[`${questionNum}-answer-3`]?.message ? (
                            <span className="text-sm text-red-800">
                                {errors[
                                    `${questionNum}-answer-3`
                                ]?.message?.toString()}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flex w-full items-center gap-2">
                    <label htmlFor="correctAnswer" className="text-base">
                        Correct answer
                    </label>
                    <select
                        defaultValue={question?.correctAnswer}
                        className="h-8 w-[25%] border-violet-800 bg-gray-100 outline-none focus:border-2"
                        {...register(`${questionNum}-correctAnswer`, {
                            required: "This field is required.",
                        })}
                    >
                        <option value="0">
                            {values[0] || question?.answers[0] || "Option 1"}
                        </option>
                        <option value="1">
                            {values[1] || question?.answers[1] || "Option 2"}
                        </option>
                        <option value="2">
                            {values[2] || question?.answers[2] || "Option 3"}
                        </option>
                        <option value="3">
                            {values[3] || question?.answers[3] || "Option 4"}
                        </option>
                    </select>
                </div>
            </div>
        </li>
    )
}

export default QuestionForm
