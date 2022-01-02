import "@styles/globals.css";
import { UserContext } from "@modules/contexter";
import { useUserData } from "@modules/hooker";
import { Navbar, Footer, Toaster } from "@modules/composer";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const UserData = useUserData();
  const router = useRouter();

  return (
    <UserContext.Provider value={UserData}>
      <Navbar />
      <div className="pt-14 mt-10 print:!pt-1 print:!mt-0">
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
