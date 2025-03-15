import { useForm } from "react-hook-form"
import Button from "../../ui/Button.tsx"
import Input from "../../ui/Input.tsx"
import QuestionForm from "./QuestionForm.tsx"
import { useState } from "react"
import { useQuizzes } from "../../contexts/QuizzesContext"

function CreateQuizForm({ onCloseModal, quiz }) {
    const { handleSubmit, register, getValues, setValue, formState, control } =
        useForm()

    const { createQuiz, editQuiz } = useQuizzes()
    const { errors } = formState

    const isEditing = Boolean(quiz)
    const [questions, setQuestions] = useState(
        isEditing ? quiz.questions.length : 1,
    )

    // console.log(quiz.questions)
    function onSubmit() {
        const values = getValues()
        const numArr = Array.from({ length: questions }, (_, i) => i)
        const id = Date.now() + ""
        const newQuizQuestions = []

        numArr.forEach((i) => {
            const question = {
                question: "",
                answers: [],
                correctAnswer: null,
            }

            Object.entries(values).map((p) => {
                if (p[0][0] === String(i)) {
                    p[0].split("-")[1] === "answer"
                        ? (question.answers = [...question.answers, p[1]])
                        : null
                    p[0].split("-")[1] === "question"
                        ? (question.question = p[1])
                        : null
                    p[0].split("-")[1] === "correctAnswer"
                        ? (question.correctAnswer = +p[1])
                        : null
                }
            })

            newQuizQuestions.push(question)
        })

        if (isEditing) {
            const newQuiz = {
                ...quiz,
                description: values.description,
                title: values.title,
                author: values.author || "anonymous",
                questions: [...newQuizQuestions],
            }
            console.log(newQuiz)
            editQuiz(newQuiz)
        }

        if (!isEditing) {
            const newQuiz = {
                id,
                description: values.description,
                title: values.title,
                author: values.author || "anonymous",
                questions: [...newQuizQuestions],
            }
            createQuiz(newQuiz)
        }

        onCloseModal?.()
    }

    function addQuestion() {
        setQuestions((questions) => questions + 1)
    }

    function removeQuestion() {
        setQuestions((questions) => questions - 1)
    }

    return (
        <div>
            <h1 className="my-4 text-4xl font-bold">
                {isEditing ? "Edit" : "Create"} Quiz
            </h1>
            <form
                method="get"
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-1">
                    <label className="text-xl" htmlFor="title">
                        Title
                    </label>
                    <Input
                        defaultValue={isEditing ? quiz.title : ""}
                        register={register("title", {
                            required: "Title is required.",
                            maxLength: {
                                value: 16,
                                message: "Title is too long.",
                            },
                        })}
                    />
                    <div className="-my-1 h-3">
                        {errors?.title?.message ? (
                            <span className="text-sm text-red-800">
                                {errors?.title?.message}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="my-2 flex flex-col gap-1">
                    <label className="text-xl" htmlFor="author">
                        Author
                    </label>

                    <Input
                        defaultValue={
                            isEditing
                                ? quiz.author !== "anonymous"
                                    ? quiz.author
                                    : ""
                                : ""
                        }
                        register={register("author")}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xl" htmlFor="description">
                        Description
                    </label>
                    <Input
                        defaultValue={isEditing ? quiz.description : ""}
                        register={register("description", {
                            required: "Description is required.",
                            maxLength: {
                                value: 64,
                                message: "Description is too long.",
                            },
                        })}
                    />
                    <div className="-my-1 h-3">
                        {errors?.description?.message ? (
                            <span className="text-sm text-red-800">
                                {errors?.description?.message}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl" htmlFor="author">
                            Questions
                        </h2>
                        <button
                            onClick={addQuestion}
                            type="button"
                            className="flex h-2 w-2 items-center justify-center rounded-full bg-violet-900 p-[12px] text-lg text-gray-200 transition-colors duration-300 hover:bg-violet-950"
                        >
                            +
                        </button>
                    </div>
                    <ul className="flex max-h-[30dvh] flex-col gap-6 overflow-auto xs:max-h-[50dvh] md:max-h-[25dvh]">
                        {Array.from({ length: questions }, (_, i) => i).map(
                            (_, i) => (
                                <QuestionForm
                                    question={
                                        isEditing ? quiz.questions[i] : ""
                                    }
                                    control={control}
                                    key={i}
                                    numOfQuestions={questions}
                                    questionNum={i}
                                    register={register}
                                    errors={errors}
                                    handleDelete={removeQuestion}
                                    setValue={setValue}
                                    getValues={getValues}
                                />
                            ),
                        )}
                    </ul>
                </div>
                <div className="flex w-full justify-center">
                    <Button type="wide">
                        {isEditing ? "Edit" : "Create"} Quiz
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateQuizForm
