import { Checkbox, Label } from 'flowbite-react';

export default function CheckboxField({label, name, changeHandler}) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <Checkbox id={name} name={name} onChange={changeHandler} />
            <Label htmlFor={name}>{label}</Label>
        </div>
    );
}