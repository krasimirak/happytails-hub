import { Label, TextInput } from 'flowbite-react';

export default function TextField({label, name, value, type, changeHandler, className}) {
    return (
        <div className={`mb-5 ${className || ''}`}>
            <div className="mb-2 block">
                <Label htmlFor={name}>{label}</Label>
            </div>

            <TextInput
                id={name}
                name={name}
                value={value}
                onChange={changeHandler}
                type={type}
                required
            />
        </div>
    )
}