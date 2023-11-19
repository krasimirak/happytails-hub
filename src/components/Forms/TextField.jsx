import { Label, TextInput } from 'flowbite-react';

export default function TextField({label, name, value, changeHandler}) {
    return (
        <div className="mb-5">
            <div className="mb-2 block">
                <Label htmlFor={name}>{label}</Label>
            </div>

            <TextInput
                id={name}
                name={name}
                value={value}
                onChange={changeHandler}
                required
            />
        </div>
    )
}