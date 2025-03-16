export interface Question {
    question: string
    answers: string[]
    correctAnswer: number
}

export interface Quiz {
    id: number
    title: string
    author: string | undefined
    description: string
    questions: Question[]
}

export interface State {
    status: "loading" | "ready" | "active" | "finished" | "error"
    quizzes: Quiz[]
    error: string | undefined
    activeQuiz: {
        id: number | null
        corrects: number
        currentQuestion: number
        answer: number | null
        correctAnswer: number | null
        questions: Question[]
    }
}

export interface Action {
    type: string
    payload?:
        | Quiz
        | number
        | { id: number; questions: Question[]; correctAnswer: number }
        | string
        | Quiz[]
}
