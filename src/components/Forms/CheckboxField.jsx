import { Checkbox, Label } from 'flowbite-react';

export default function CheckboxField({label, name, value, changeHandler, className}) {
    return (
        <div className={`flex items-center gap-2 mb-3 ${className || ''}`}>
            <Checkbox id={name} name={name} onChange={changeHandler} defaultChecked={value} />
            <Label htmlFor={name}>{label}</Label>
        </div>
    );
}