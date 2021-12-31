import "@styles/globals.css";
import { UserContext } from "@modules/context";
import { useUserData } from "@modules/hooks";
import { Navbar, Footer } from "@modules/composer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const UserData = useUserData();

  return (
    <UserContext.Provider value={UserData}>
      <Navbar />
      <div>
        <main className="w-[80%] m-auto my-8 pt-14 bg-gray-200 text-gray-800">
          <Component {...pageProps} />
          <Footer />
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default MyApp;
