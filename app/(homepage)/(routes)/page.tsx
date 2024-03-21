import Container from "@/components/ui/container";
import EmptyState from "@/components/empty-state";
import getListings, {IListingsParams} from "@/actions/get-listings";
import ListingCard from "@/components/listings/listing-card";
import getCurrentUser from "@/actions/get-current-user";


interface HomesProps {
    searchParams: IListingsParams
}
const Home = async ({searchParams}: HomesProps) => {

    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();
    if (listings.length === 0) {
        return (
            <EmptyState showReset />
        );
    }


    return (
        <>
            <Container>
                <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {listings.map((listing) => {
                        return (
                            <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
                        )
                    })}
                </div>
            </Container>
        </>
    );
}

export default Home;
