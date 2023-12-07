import { useState, useRef, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

import { PET_DETAILS } from "../../constants";

import * as petsApi from '../../api/petsApi';

import CheckboxField from "./CheckboxField";


export default function Filters({resultsHandler, loadingHandler, loading}) {
    const [filters, setFilters] = useState({
        'good_with_dogs': false,
        'good_with_cats': false,
        'good_with_kids': false,
        'house_trained': false,
    })
    const [error, setError] = useState(false);
    const errorRef = useRef(null);

    useEffect(() => {
        loadingHandler(true);

        petsApi.getAllFiltered(filters)
            .then(data => {
                setError(false);
                resultsHandler(data);
            })
            .catch(() => {
                setError(true);
                errorRef.current?.scrollIntoView({ behavior: 'smooth' });
            })
            .finally(() => loadingHandler(false));
    }, [filters, loadingHandler, resultsHandler]);

    const onFieldChange = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setFilters(state => ({
            ...state,
            [target.name]: value
        }));
    }

    return (
        <>
            {error && (
                <div ref={errorRef} className="mb-8">
                    <Alert color="failure" icon={HiInformationCircle} >
                        <span className="font-medium">We ran into an issue, please try again later.</span>
                    </Alert>
                </div>)}
            <form>

            {loading && <Spinner aria-label="Loading filter results" size="xl" />}

            {
                Object.values(PET_DETAILS).map((field) => {
                    const key = 'field_' + field.name;

                    if (field.inputType === 'checkbox') {
                        return (
                            <CheckboxField
                                key={key}
                                label={field.label}
                                name={field.name}
                                value={filters[field.name]}
                                changeHandler={onFieldChange}
                                />
                        )
                    }

                    return;
                })
            }
            </form>

        </>
    )
}
