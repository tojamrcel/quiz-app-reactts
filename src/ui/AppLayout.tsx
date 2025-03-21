import { Outlet } from "react-router-dom"
import Header from "./Header.tsx"

function AppLayout() {
    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout
