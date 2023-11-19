import { useState, useMemo } from "react";

import { PET_DETAILS } from "../../constants";

import TextField from "./TextField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import { Button } from "flowbite-react";

/**
 *
 * @param {Object} props - React component properties
 * @param {Object} props.pet - initial pet data - used if for editing pet data
 * @returns {JSX.Element} React component
 */

export default function PetForm({pet}) {
    const stateFromTemplate = useMemo(() => (
        Object.fromEntries(Object.values(PET_DETAILS).map(field => [field.name, field.defaultValue]))
    ), []);

    const [data, setData] = useState(pet || stateFromTemplate);

    const onFieldChange = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setData(state => ({
            ...state,
            [target.name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        data;

        if (pet) {
            // call update function
        }
        else {
            // call add function
        }
    }

    return (
        <form onSubmit={onSubmit}>
        {
            Object.values(PET_DETAILS).map((field) => {
                const key = 'field_' + field.name;

                if (field.inputType === 'text') {
                    return (
                        <TextField
                            key={key}
                            label={field.label}
                            name={field.name}
                            changeHandler={onFieldChange} />
                    )
                }

                if (field.inputType === 'select') {
                    return (
                        <SelectField
                            key={key}
                            label={field.label}
                            name={field.name}
                            options={field.values}
                            value={field.defaultValue}
                            changeHandler={onFieldChange} />
                    )
                }

                if (field.inputType === 'checkbox') {
                    return (
                        <CheckboxField
                            key={key}
                            label={field.label}
                            name={field.name}
                            changeHandler={onFieldChange} />
                    )
                }

                return;
            })
        }
            <Button type="submit" className="my-8">Save</Button>
        </form>
    )

}

