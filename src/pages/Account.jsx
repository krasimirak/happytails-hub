import { useAuth } from '../context/authContext';

export default function Account() {
    const { user } = useAuth();

    return (
        <main className="container px-4 mx-auto">
            <h1 className="text-4xl my-8">My Account</h1>

            {user.displayName && <div>Name: {user.displayName}</div>}
            <div>Email: {user.email}</div>
        </main>
    )
}