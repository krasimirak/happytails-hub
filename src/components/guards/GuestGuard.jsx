import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/authContext";

export default function GuestGuard() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" />
    }

    return <Outlet />;
}