import { UserContext } from "@modules/contexter";
import { useContext } from "react";

export default function NavSearch({ toggle }) {
  const { modal } = useContext(UserContext);

  return (
    <div id="search-input" className={toggle}>
      <input
        className="border-2 bg-gray-200 b-transition h-10 px-5 pr-28 rounded-md focus:outline-none w-72 md:w-96 text-gray-800 text-sm"
        type="text"
        name="search"
        placeholder="Cari ide brilian ..."
      />
      <button
        onClick={() =>
          modal.openModal({
            title: "404 - Maintenance",
            content:
              "Fitur pencarian sedang dalam tahap pengembangan. Kami memohon maaf yang sebesar-sebesarnya dan berusaha semaksimal mungkin untuk menyelesaikannya. Terima kasih atas dukungannya 😉",
          })
        }
        type="submit"
        className="mr-[5px] absolute right-0 top-1 text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded-md px-7 py-1 b-transition"
      >
        #Cari
      </button>
    </div>
  );
}
