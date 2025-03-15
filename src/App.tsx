import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout.tsx";
import Quizzes from "./pages/Quizzes.tsx";
import Quiz from "./pages/Quiz.tsx";
import Result from "./pages/Result.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to={"quizzes"} />}></Route>
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="quiz/:quizId" element={<Quiz />} />
          <Route
            path="result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            padding: "16px 32px",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
