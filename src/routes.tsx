import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import Error from "./pages/error"
import CreatePost from "./pages/createPost"
import Login from "./pages/login"
import MyPosts from "./pages/myPosts"
import Profile from "./pages/profile"
import SignUp from "./pages/signUp"
import ProtectedRoutes from "./components/ProtectedRoutes"
import PublicRoute from "./components/PublicRoute"

const router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: "/createpost",
                element: <CreatePost />,
                errorElement: <Error />
            },
            {
                path: "/myposts",
                element: <MyPosts />,
                errorElement: <Error />
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <Error />
            },
        ]
    },
    {
        element: <PublicRoute />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> }
        ]
    }

])

export default router 