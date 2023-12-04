import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/authContext";

import { PATH } from "../../constants";

export default function AdminGuard() {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to={PATH.NotFound} />
    }

    return <Outlet />
}