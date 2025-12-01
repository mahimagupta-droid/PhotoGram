import { createBrowserRouter } from "react-router-dom"
import { Login } from "./pages/login"
import { Error } from "./pages/error"
import { Home } from "./pages/home"
import { SignUp } from "./pages/signup"
import { Profile } from "./pages/profile"
import { Photos } from "./pages/myPhotos"
import { CreatePost } from "./pages/post"
import ProtectedRoutes from "./components/ProtectedRoutes"

const Router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <Error />
            },
            {
                path: "/photos",
                element: <Photos />,
                errorElement: <Error />
            },
            {
                path: "/create-post",
                element: <CreatePost />,
                errorElement: <Error />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />
    },

    {
        path: "/signup",
        element: <SignUp />,
        errorElement: <Error />
    },

])

export default Router;