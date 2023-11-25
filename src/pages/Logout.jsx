import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { PATH } from "../constants";

export default function Logout() {
    const [error, setError] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout()
            .then(() => navigate(PATH.Home))
            .catch(err => {
                setError(true);
            })
    }, [logout, navigate])

    return ( error && (<h1> Error trying to logout</h1>) )
}