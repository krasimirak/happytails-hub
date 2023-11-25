import { Label, Select } from 'flowbite-react';

export default function SelectField({label, name, options, value, changeHandler, className}) {
   return (
        <div className={`mb-5 ${className || ''}`}>
            <div className="mb-2 block">
                <Label htmlFor={name}>Select {label}</Label>
            </div>
            <Select id={name} name={name} required onChange={changeHandler} value={value} >
                <option value="" disabled></option>
                {options.map(val => (
                    <option key={val} value={val}>
                        {val}
                    </option>
                ))}
            </Select>
        </div>
    );
}