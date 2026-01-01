import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "@/context/userAuthContext"

const PublicRoute = () => {
  const { user } = useUserContext()

  return user ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute
