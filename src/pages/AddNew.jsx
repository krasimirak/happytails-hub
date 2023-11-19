import PetForm from "../components/Forms/PetForm";

export default function AddNew() {


    return (
        <main className="container mx-auto">
            <h1 className="text-4xl font-extrabold my-8">Add new pet</h1>

            <PetForm />
        </main>
    )
}