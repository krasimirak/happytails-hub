import HeroBanner from "../components/HeroBanner/HeroBanner";

export default function Home() {
    const heading = <span>
        Find your <strong>new best friend</strong>
    </span>;

    return (
        <main className='container mx-auto px-4 pt-0'>
            <HeroBanner heading={heading} />
        </main>
    )
}