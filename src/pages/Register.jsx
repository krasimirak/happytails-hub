import { useState } from "react";

import { Alert, Label, TextInput, Button } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';


import * as authApi from '../api/auth';
import { useNavigate } from "react-router-dom";

const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,32}$/;


export default function Register() {
    const [email, setEmail] = useState('test');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [passwordStrengthError, setPasswordStrengthError] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const navigate = useNavigate();


    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onPasswordRepeatChange = (e) => {
        setPasswordRepeat(e.target.value);
    }

    const onRegisterSubmit = (e) => {
        e.preventDefault();

        const isStrong = passwordRegex.test(password);
        const isMatching = password === passwordRepeat;

        isStrong ? setPasswordStrengthError(false) : setPasswordStrengthError(true);
        isMatching ? setPasswordMismatchError(false): setPasswordMismatchError(true);

        if (isStrong && isMatching) {
            authApi.register(email, password)
                .then(res => {
                    navigate("/pets");
                })
                .catch((error) => {
                    setRegisterError(true);
                })
        }
    }

    return (
        <main className="container px-4 mx-auto">
            <h1 className="text-4xl font-extrabold my-8">Register</h1>

            {registerError && (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span className="font-medium">Something went wrong!</span> You can&apos;t be registered with the provided data.
                </Alert>
            )}
            <form onSubmit={onRegisterSubmit}>
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
                    <Label htmlFor="password" value="Your password" color={passwordStrengthError && 'failure'} />
                    <TextInput
                        id="password"
                        type="password"
                        required
                        className="mb-2"
                        value={password}
                        onChange={onPasswordChange}
                        helperText={passwordStrengthError && (
                            <span className="font-medium">Password is not strong enough</span>
                        )}
                        color={passwordStrengthError && 'failure'}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="password-repeat" value="Repeat password" color={passwordMismatchError && 'failure'} />
                    <TextInput
                        id="password-repeat"
                        type="password"
                        required
                        className="mb-2"
                        value={passwordRepeat}
                        onChange={onPasswordRepeatChange}
                        helperText={passwordMismatchError && (
                            <span className="font-medium">Passwords dont match</span>
                        )}
                        color={passwordMismatchError && 'failure'}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </main>
    )
}