import PetsList from "../components/PetsList/PetsList";

export default function PetsListPage() {
    return (
        // bg-light-blue
        <main className="bg-white pt-8 pb-14">
            <div className="container px-4 mx-auto">
                <h1 className="basis-full mt-6 mb-14">Open for adoption</h1>

                <PetsList />

{/* TO DO: ADD FILTERS */}
                {/* <aside className="basis-full lg:basis-1/4">
                    <h2>Filters</h2>
                </aside>
                <section className="basis-full lg:basis-3/4">
                    <PetsList />
                </section> */}

                <div>
                    {/* Pagination goes here */}
                </div>
            </div>
        </main>
    )
}