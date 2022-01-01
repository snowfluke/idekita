import "@styles/globals.css";
import { UserContext } from "@modules/context";
import { useUserData } from "@modules/hooks";
import { Navbar, Footer, Toaster } from "@modules/composer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const UserData = useUserData();

  return (
    <UserContext.Provider value={UserData}>
      <Navbar />
      <div className="pt-14 print:!pt-1">
        <main className="w-[80%] mx-auto">
          <Component {...pageProps} />
          <Footer />
        </main>
      </div>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
