import "@styles/globals.css";
import { UserContext } from "@modules/contexter";
import { useUserData } from "@modules/hooker";
import { Navbar, Footer, Toaster, Meta, Modal } from "@modules/composer";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const UserData = useUserData();

  return (
    <UserContext.Provider value={UserData}>
      <Meta
        title="iDekita 🌉 Jembatani dengan realisasi"
        description="Bergabung bersama kami sebagai Idekiawan, mengumpulkan semua ide-ide dan solusi kreatif demi masa depan yang lebih baik lagi"
      />
      <Navbar />
      <div className="pt-14 mt-10 print:!pt-1 print:!mt-0">
        <main className="w-[80%] mx-auto">
          <Component {...pageProps} />
          <Footer />
        </main>
      </div>
      <Toaster />
      {UserData.modalData.show && <Modal />}
    </UserContext.Provider>
  );
}

export default MyApp;
