import { Navigate, useLocation, Outlet } from "react-router-dom"

const ProtectedRoutes = (  ) => {
    const isAuth : boolean = false;
    const location = useLocation()
    return isAuth? ( <Outlet/> ) : (
        <Navigate to="/login" state={{from: location }} />
    )
}

export default ProtectedRoutes