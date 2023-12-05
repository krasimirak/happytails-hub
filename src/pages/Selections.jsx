import PetsList from "../components/PetsList/PetsList";

export default function Selections() {

    return (
        <main className="container px-4 mx-auto">
            <h1 className="text-4xl mt-6 mb-14">My Selections</h1>

            <PetsList isSelections={true} />
        </main>
    )
}