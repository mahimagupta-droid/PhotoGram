import { Navigate, useLocation, Outlet } from "react-router-dom"

const ProtectedRoutes = (  ) => {
    const isAuth : boolean = true;
    const location = useLocation()
    return isAuth? ( <Outlet/> ) : (
        <Navigate to="/login" state={{from: location }} />
    )
}

export default ProtectedRoutes