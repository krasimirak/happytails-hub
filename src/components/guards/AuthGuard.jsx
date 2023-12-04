import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/authContext";

import { PATH } from "../../constants";

export default function AuthGuard() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
       return <Navigate to={PATH.Login} />;
    }

    return <Outlet />;
}