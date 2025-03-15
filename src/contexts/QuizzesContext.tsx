/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from "react"
import toast from "react-hot-toast"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface QuizzesContextType {
    status: State["status"]
    quizzes: State["quizzes"]
    error: State["error"]
    activeQuiz: State["activeQuiz"]
    startQuiz: (quiz: Quiz) => void
    stopQuiz: () => void
    dispatch: React.Dispatch<Action>
    createQuiz: (quiz: Quiz) => Promise<void>
    deleteQuiz: (quizId: number) => Promise<void>
    editQuiz: (quiz: Quiz) => Promise<void>
}

const QuizzesContext = createContext<QuizzesContextType | undefined>(undefined)

const quizzesArray = [
    {
        id: "1",
        title: "Science Quiz",
        author: "Marcel G",
        description: "Quiz about science things.",
        questions: [
            {
                question: "What is the chemical symbol for gold?",
                answers: ["Au", "Ag", "Fe", "Cu"],
                correctAnswer: 0,
            },
            {
                question: "Which planet is known as the Red Planet?",
                answers: ["Venus", "Jupiter", "Mars", "Saturn"],
                correctAnswer: 2,
            },
            {
                question: "What is the powerhouse of the cell?",
                answers: [
                    "Ribosome",
                    "Nucleus",
                    "Mitochondrion",
                    "Golgi apparatus",
                ],
                correctAnswer: 2,
            },
            {
                question: "Which force holds the nucleus of an atom together?",
                answers: [
                    "Electromagnetic force",
                    "Gravitational force",
                    "Weak nuclear force",
                    "Strong nuclear force",
                ],
                correctAnswer: 3,
            },
            {
                question:
                    "What is the hardest natural substance found on Earth?",
                answers: ["Iron", "Quartz", "Diamond", "Marble"],
                correctAnswer: 2,
            },
            {
                question:
                    "What is the smallest unit of matter that retains the properties of an element?",
                answers: ["Proton", "Atom", "Molecule", "Electron"],
                correctAnswer: 1,
            },
            {
                question:
                    "Which of the following is NOT a type of renewable energy source?",
                answers: ["Solar", "Nuclear", "Wind", "Hydroelectric"],
                correctAnswer: 1,
            },
            {
                question:
                    "What is the process by which plants make their own food using sunlight?",
                answers: [
                    "Respiration",
                    "Photosynthesis",
                    "Decomposition",
                    "Transpiration",
                ],
                correctAnswer: 1,
            },
            {
                question:
                    "Which scientist is credited with the discovery of the laws of motion and universal gravitaion?",
                answers: [
                    "Albert Einstein",
                    "Isaac Newton",
                    "Galileo Galilei",
                    "Charles Darwin",
                ],
                correctAnswer: 1,
            },
            {
                question:
                    "Which layer of the Earth is made up of solid iron and nickel?",
                answers: ["Mantle", "Crust", "Outer core", "Inner core"],
                correctAnswer: 3,
            },
        ],
    },
    {
        id: "2",
        title: "History Quiz.",
        author: "hello123",
        description: "Quiz about history things.",
        questions: [
            {
                question: "Who was the first President of the United States?",
                answers: [
                    "Thomas Jefferson",
                    "George Washington",
                    "Abraham Lincoln",
                    "John Adams",
                ],
                correctAnswer: 1,
            },
            {
                question:
                    "Which battle marked the end of Napoleon's rule in France?",
                answers: [
                    "Battle of Waterloo",
                    "Battle of Austerlitz",
                    "Battle of Trafalgar",
                    "Battle of Borodino",
                ],
                correctAnswer: 0,
            },
            {
                question:
                    "Which ancient civilization built the Great Pyramids of Giza?",
                answers: ["Mesopotamians", "Romans", "Egyptians", "Greeks"],
                correctAnswer: 2,
            },
            {
                question:
                    "Which famous explorer is credited with discovering America in 1492?",
                answers: [
                    "Vasco da Gama",
                    "Ferdinand Magellan",
                    "Christopher Columbus",
                    "Marco Polo",
                ],
                correctAnswer: 2,
            },
            {
                question:
                    "Which document guaranteed certain rights to English citizens and was signed by King John in 1215?",
                answers: [
                    "Magna Carta",
                    "Declaration of Independence",
                    "Code of Hammurabi",
                    "Bill of Rights",
                ],
                correctAnswer: 0,
            },
            {
                question: "In which year did World War I begin?",
                answers: ["1914", "1918", "1939", "1945"],
                correctAnswer: 0,
            },
            {
                question:
                    "Which ancient wonder of the world was located in Babylon, Iraq?",
                answers: [
                    "Lighthouse of Alexandria",
                    "Hanging Gardens",
                    "Colossus of Rhodes",
                    "Temple of Artemis",
                ],
                correctAnswer: 1,
            },
            {
                question:
                    "Who was the first female Prime Minister of the United Kingdom?",
                answers: [
                    "Margaret Thatcher",
                    "Angela Merkel",
                    "Theresa May",
                    "Indira Gandhi",
                ],
                correctAnswer: 0,
            },
            {
                question:
                    "Who was the principal author of the Declaration of Independence of the United States?",
                answers: [
                    "George Washington",
                    "Benjamin Franklin",
                    "Thomas Jefferson",
                    "John Adams",
                ],
                correctAnswer: 2,
            },
            {
                question:
                    "Which Roman Emperor famously declared himself divine, initiating the cult of the emperor?",
                answers: ["Augustus", "Nero", "Julius Caesar", "Caligula"],
                correctAnswer: 3,
            },
        ],
    },
    {
        id: "3",
        title: "Literature Quiz.",
        author: "test321",
        description: "Quiz about literature.",
        questions: [
            {
                question: 'Who wrote the play "Romeo and Juliet"?',
                answers: [
                    "William Shakespeare",
                    "Charles Dickens",
                    "Jane Austen",
                    "F. Scott Fitzgerald",
                ],
                correctAnswer: 0,
            },
            {
                question: 'Who wrote the novel "Jane Eyre"?',
                answers: [
                    "Charlotte Brontë",
                    "Emily Dickinson",
                    "Virginia Woolf",
                    "Mary Shelley",
                ],
                correctAnswer: 0,
            },
            {
                question: 'Who wrote the famous novel "Pride and Prejudice"?',
                answers: [
                    "Jane Austen",
                    "Charles Dickens",
                    "Emily Bronze",
                    "F. Scott Fitzgerald",
                ],
                correctAnswer: 0,
            },
            {
                question:
                    "Which Shakespearean play features the characters Romeo and Juliet?",
                answers: ["Hamlet", "Macbeth", "Romeo and Juliet", "Othello"],
                correctAnswer: 2,
            },
            {
                question:
                    "Which novel by Harper Lee features the character Atticus Finch?",
                answers: [
                    "To Kill a Mockingbird",
                    "The Great Gatsby",
                    "1984",
                    "Moby-Dick",
                ],
                correctAnswer: 0,
            },
            {
                question: 'Who wrote the epic poem "Paradise Lost"?',
                answers: [
                    "John Keats",
                    "John Milton",
                    "William Wordsworth",
                    "Samuel Taylor Coleridge",
                ],
                correctAnswer: 1,
            },
            {
                question:
                    "In which play by Arthur Miller does the character Willy Loman appear?",
                answers: [
                    "Death of a Salesman",
                    "The Crucible",
                    "A View from the Bridge",
                    "All My Sons",
                ],
                correctAnswer: 0,
            },
            {
                question:
                    "Which novel by George Orwell is a dystopian portrayal of a totalitarian society?",
                answers: [
                    "1984",
                    "Animal Farm",
                    "Brave New World",
                    "Fahrenheit 451",
                ],
                correctAnswer: 0,
            },
            {
                question:
                    'Who is the author of the famous fantasy series "The Lord of the Rings"?',
                answers: [
                    "C.S. Lewis",
                    "J.K. Rowling",
                    "J.R.R. Tolkien",
                    "George R.R. Martin",
                ],
                correctAnswer: 2,
            },
            {
                question:
                    'Which American poet wrote the poem "The Road Not Taken"?',
                answers: [
                    "Robert Frost",
                    "Walt Whitman",
                    "Emily Dickinson",
                    "Langston Hughes",
                ],
                correctAnswer: 0,
            },
        ],
    },
]

interface Question {
    question: string
    answers: string[]
    correctAnswer: number
}

interface Quiz {
    id: number
    title: string
    author: string | undefined
    description: string
    questions: Question[]
}

interface State {
    status: "loading" | "ready" | "active" | "finished"
    quizzes: []
    error: string
    activeQuiz: {
        id: number | null
        corrects: number
        currentQuestion: number
        answer: number | null
        correctAnswer: number | null
        questions: []
    }
}

interface Action {
    type: string
    payload?:
        | Quiz
        | string
        | number
        | { id: number; questions: Question[]; correctAnswer: number }
}

const initialState: State = {
    // can be also ready, active, finished
    status: "loading",
    quizzes: [],
    error: "",
    activeQuiz: {
        id: null,
        corrects: 0,
        currentQuestion: 0,
        answer: null,
        correctAnswer: null,
        questions: [],
    },
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                status: "ready",
                error: "",
                quizzes: action.payload,
            }
        case "dataFailed":
            return { ...state, status: "error", error: action.payload }
        case "startQuiz":
            return {
                ...state,
                status: "active",
                activeQuiz: {
                    ...state.activeQuiz,
                    id: action?.payload?.id,
                    currentQuestion: 0,
                    answer: null,
                    corrects: 0,
                    questions: action?.payload?.questions,
                    correctAnswer: action?.payload?.correctAnswer,
                },
            }
        case "newAnswer":
            return {
                ...state,
                activeQuiz: {
                    ...state.activeQuiz,
                    answer: action.payload,
                    corrects:
                        state.activeQuiz.correctAnswer === action.payload
                            ? state.activeQuiz.corrects + 1
                            : state.activeQuiz.corrects,
                },
            }
        case "nextQuestion":
            return {
                ...state,
                activeQuiz: {
                    ...state.activeQuiz,
                    currentQuestion: state.activeQuiz.currentQuestion + 1,
                    answer: null,
                    correctAnswer: action.payload,
                },
            }
        case "finishQuiz":
            return {
                ...state,
                status: "finished",
                activeQuiz: { ...state.activeQuiz },
            }
        case "stopQuiz":
            return {
                ...state,
                status: "ready",
                activeQuiz: {
                    ...state.activeQuiz,
                    id: null,
                    corrects: 0,
                    currentQuestion: 0,
                    answer: null,
                    correctAnswer: null,
                    questions: [],
                },
            }
        case "restartQuiz":
            return {
                ...state,
                activeQuiz: {
                    ...state.activeQuiz,
                    corrects: 0,
                    currentQuestion: 0,
                    answer: null,
                    correctAnswer:
                        state.activeQuiz.questions.at(0).correctAnswer,
                },
            }

        //  CASE editQuiz IS USED ONLY FOR NO API VERSION OF APP
        case "editQuiz": {
            return {
                ...state,
                quizzes: [
                    ...state.quizzes.filter(
                        (quiz: Quiz) => quiz.id !== action.payload.id,
                    ),
                    action.payload,
                ].sort((a, b) => a.id - b.id),
            }
        }
        default:
            return { ...state }
    }
}

function QuizzesProvider({ children }: { children: ReactNode }) {
    const [{ status, activeQuiz, quizzes, error }, dispatch] = useReducer(
        reducer,
        initialState,
    )

    const [localQuizzes, setLocalQuizzes] = useLocalStorage(
        quizzesArray,
        "quizzes",
    )

    useEffect(
        function () {
            // fetchQuizzes()
            dispatch({
                type: "dataReceived",
                payload:
                    localQuizzes.length !== 0 ? localQuizzes : quizzesArray,
            })
        },
        [localQuizzes],
    )

    function startQuiz(quiz: Quiz) {
        dispatch({
            type: "startQuiz",
            payload: {
                id: +quiz.id,
                questions: quiz.questions,
                correctAnswer: quiz.questions[0].correctAnswer,
            },
        })
    }

    function stopQuiz() {
        dispatch({
            type: "stopQuiz",
        })
    }

    // USED WHEN QUIZZEs ARE STORED IN API
    /*     async function fetchQuizzes() {
        fetch("http://localhost:8000/quizzes")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "dataReceived", payload: data })
            })
            .catch((err) =>
                dispatch({ type: "dataFailed", payload: err.message }),
            )
    } */

    async function createQuiz(quiz: Quiz) {
        try {
            // const res = await fetch("http://localhost:8000/quizzes", {
            //     method: "POST",
            //     body: JSON.stringify(quiz),
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            // if (!res.ok) throw Error("Error")
            // const data = await res.json()

            // fetchQuizzes()
            // return data
            setLocalQuizzes([...quizzes, quiz])
            toast.success("Quiz successfully created.")
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Couldn't create new quiz.")
                throw new Error(err.message)
            }
        }
    }

    async function deleteQuiz(quizId: number) {
        try {
            // const res = await fetch(`http://localhost:8000/quizzes/${quizId}`, {
            //     method: "DELETE",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            // if (!res.ok) throw Error("Error")
            // const data = await res.json()
            // fetchQuizzes()
            // return data
            setLocalQuizzes(quizzes.filter((quiz: Quiz) => quiz.id !== quizId))
            toast.success("Quiz successfully deleted.")
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Couldn't delete quiz.")
                throw new Error(err.message)
            }
        }
    }

    async function editQuiz(quiz: Quiz) {
        try {
            // const res = await fetch(
            //     `http://localhost:8000/quizzes/${quiz.id}`,
            //     {
            //         method: "PUT",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(quiz),
            //     },
            // )
            // if (!res.ok) throw Error("Error")
            // const data = await res.json()
            // fetchQuizzes()
            // return data
            setLocalQuizzes(
                [...quizzes.filter((q: Quiz) => q.id !== quiz.id), quiz].sort(
                    (a, b) => a.id - b.id,
                ),
            )
            toast.success("Quiz successfully edited.")
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Couldn't edit quiz.")
                throw new Error(err.message)
            }
        }
    }

    return (
        <QuizzesContext.Provider
            value={{
                status,
                quizzes,
                error,
                activeQuiz,
                startQuiz,
                stopQuiz,
                dispatch,
                createQuiz,
                deleteQuiz,
                editQuiz,
            }}
        >
            {children}
        </QuizzesContext.Provider>
    )
}

function useQuizzes() {
    const context = useContext(QuizzesContext)
    if (context === undefined)
        throw new Error("QuizzesContext was used outside QuizProvider")

    return context
}

export { QuizzesProvider, useQuizzes }
