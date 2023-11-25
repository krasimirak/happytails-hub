import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Label, TextInput, Button } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

import { useAuth } from '../context/authContext';
import { PATH } from '../constants';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onLoginSubmit = (e) => {
        e.preventDefault();

        login(email, password)
            .then(() => {
                setError(false);
                navigate(PATH.List);
            })
            .catch(() => {
                setError(true);
            })
    }

    return (
        <main className="container px-4 mx-auto">
            <h1 className="text-4xl font-extrabold my-8">Login</h1>

            {error && (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span className="font-medium">Please check your credentials and try again!</span>
                </Alert>
            )}
            <form onSubmit={onLoginSubmit}>
                <div className="mb-6">
                    <Label htmlFor="email" value="Your email" />
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="name@flowbite.com"
                        required
                        className="mb-2"
                        value={email}
                        onChange={onEmailChange} />
                </div>

                <div className="mb-6">
                    <Label htmlFor="password" value="Your password"  />
                    <TextInput
                        id="password"
                        type="password"
                        required
                        className="mb-2"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>

                <Button type="submit" size="lg">Log in</Button>
            </form>
        </main>
    )
}