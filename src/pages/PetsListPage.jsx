import PetsList from "../components/PetsList/PetsList";
import { USER_ROLES } from "../constants";

export default function PetsListPage() {
    return (
        // bg-light-blue
        <main className="bg-white pt-8 pb-14">
            <div className="container px-4 mx-auto flex flex-wrap">
                <h1 className="basis-full">Open for adoption</h1>

                <aside className="basis-full lg:basis-1/4">
                    <h2>Filters</h2>
                    {/* Filters go here */}
                </aside>
                <section className="basis-full lg:basis-3/4">
                    {/* <h2>Results</h2> */}

                    {/* TO DO: Dynamic userRole */}
                    <PetsList userRole={USER_ROLES.guest} />
                </section>

                <div>
                    {/* Pagination goes here */}
                </div>
            </div>
        </main>
    )
}