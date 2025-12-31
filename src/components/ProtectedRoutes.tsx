import { useLocation, Outlet, Navigate } from "react-router-dom"
// type Props = {}

const ProtectedRoutes = () => {
    const isAuth:boolean = false;
    const location = useLocation()

  return isAuth? (<Outlet/>) : (<Navigate to="/login" state={{from: location}} />)
}

export default ProtectedRoutes