import { useState, useMemo } from "react";

import { PET_DETAILS } from "../constants";

import TextField from "../components/Forms/TextField";
import SelectField from "../components/Forms/SelectField";
import CheckboxField from "../components/Forms/CheckboxField";

export default function AddNew() {
    const stateFromTemplate = useMemo(() => (
        Object.fromEntries(Object.values(PET_DETAILS).map(field => [field.name, field.defaultValue]))
    ), []);

    const [petData, setPetData] = useState(stateFromTemplate);

    const onFieldChange = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setPetData({
            ...petData,
            [target.name]: value
        });
    }

    return (
        <main className="container mx-auto">
            <h1 className="text-4xl font-extrabold my-8">Add new pet</h1>

            <form>
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
            </form>

        </main>
    )
}