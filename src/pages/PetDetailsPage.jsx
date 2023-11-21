import { useParams } from "react-router-dom";
import PetDetails from "../components/PetDetails/PetDetails";

export default function PetDetailsPage() {
    const { id } = useParams();

    return (
        <main className="container px-4 mx-auto">
            <PetDetails id={id} />
        </main>
    )
}