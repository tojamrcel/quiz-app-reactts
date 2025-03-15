import QuizzesList from "../features/quizzes/QuizzesList.tsx"

function Quizzes() {
    return (
        <>
            <div className="flex min-h-12 items-center justify-center bg-violet-800 md:min-h-16">
                <p className="text-center text-sm text-gray-300 md:text-lg">
                    👋 FOR DEMO VERSION OF APP ALL API FEATURES HAVE BEEN
                    IMPLEMENTED LOCALLY
                </p>
            </div>
            <div className="mx-auto block max-h-[100rem] max-w-[50rem]">
                <QuizzesList />
            </div>
        </>
    )
}

export default Quizzes
