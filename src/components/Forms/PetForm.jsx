import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { PET_DETAILS } from "../../constants";

import TextField from "./TextField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";


import * as petsApi from '../../api/petsApi';

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
    const [error, setError] = useState(false);
    const errorRef = useRef(null);

    const navigate = useNavigate();

    const onFieldChange = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setData(state => ({
            ...state,
            [target.name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(data);

        if (pet) {
            // call update function
        }
        else {
            petsApi.create(data)
                .then(id => navigate(`/pet/${id}`))
                .catch(() => {
                    setError(true);
                    errorRef.current?.scrollIntoView({ behavior: 'smooth' });
                });
        }
    }

    return (
        <>
            {error && (
                <div ref={errorRef} className="mb-8">
                    <Alert color="failure" icon={HiInformationCircle} >
                        <span className="font-medium">We ran into an issue trying to submit the data, please try again later.</span>
                    </Alert>
                </div>)}
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
                                value={data[field.name]}
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
                                value={data[field.name]}
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
        </>
    )

}

