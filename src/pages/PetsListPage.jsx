import { useState } from "react";
import PetsList from "../components/PetsList/PetsList";
import Filters from "../components/Forms/Filters";

export default function PetsListPage() {
    const [loading, setLoading] = useState(false);
    const [petData, setPetData] = useState([]);

    const onFilterResults = (data) => {
        setPetData(data);
    }

    const loadingHandler = (isLoading) => {
        if (loading !== isLoading) setLoading(isLoading);
    };

    return (
        <main className="bg-white pt-8 pb-14">
            <div className="container px-4 mx-auto flex flex-wrap">
                <h1 className="basis-full mt-6 mb-14">Open for adoption</h1>

                <aside className="basis-full lg:basis-1/4">
                    <h2>Filters</h2>
                    <Filters
                        resultsHandler={onFilterResults}
                        loadingHandler={loadingHandler}
                        loading={loading} />
                </aside>
                <section className="basis-full lg:basis-3/4">
                    <PetsList
                        results={petData}
                        loading={loading} />
                </section>

                <div>
                    {/* Pagination goes here */}
                </div>
            </div>
        </main>
    )
}