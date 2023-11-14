import { useParams } from "react-router-dom";

export default function PetDetailsPage() {
    const { id } = useParams();

    return (
        <main className="container mx-auto">
            <h1>Pet details {id}</h1>
        </main>
    )
}