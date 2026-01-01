import { useLocation, Outlet, Navigate } from "react-router-dom"
import { useUserContext } from "@/context/userAuthContext";
const ProtectedRoutes = () => {
  const userContext = useUserContext();
    const isAuth:boolean = userContext.user !== null;
    const location = useLocation()
  return isAuth? (<Outlet/>) : (<Navigate to="/login" state={{from: location}} />)
}

export default ProtectedRoutes