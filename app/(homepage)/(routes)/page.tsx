import {auth} from "@/auth";


const  Home = async  () => {
    const session = await auth();
  return (
    <>
        {JSON.stringify(session)}
    </>
  );
}

export default Home;
