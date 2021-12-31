import { useState } from "react";
import { signOut } from "@modules/helper";
import { LinkTo } from "@modules/composer";

export default function NavProfile({ user }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const showMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifMenu(false);
  };

  const showNotif = () => {
    setShowNotifMenu(!showNotifMenu);
    setShowProfileMenu(false);
  };
  return (
    <>
      <div className="relative text-left">
        <ul className="flex items-center list-none">
          <li className="text-fuchsia-500 px-3 py-1 border border-fuchsia-500 rounded hover:bg-fuchsia-500 hover:text-white b-transition">
            <a href="#" className="lg:block">
              #Buat ide
            </a>
          </li>
          <li className="md:ml-5 rounded list-none">
            <a
              className="relative p-[3px] cursor-pointer hover:border-b border-fuchsia-500 hover:text-fuchsia-400"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => showNotif()}
            >
              #Notifikasi
            </a>
          </li>
          <li className="md:ml-5 rounded">
            <div className="flex md:space-x-2">
              <div
                className="w-10 h-10 cursor-pointer"
                onClick={() => showMenu()}
              >
                <img
                  width={50}
                  height={50}
                  className="rounded-full border-2 p-[2px] border-fuchsia-500 shadow-sm hover:border-dashed b-transition hover:scale-105 hover:-rotate-3"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
              </div>
            </div>
          </li>
          {showNotifMenu && <NotificationItems />}
          {showProfileMenu && <ProfileMenu />}
        </ul>
      </div>
    </>
  );
}

const ProfileMenu = () => {
  return (
    <div
      className=" origin-top-right absolute right-0 mt-2 top-10 w-44 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-btn"
      id="dropnav"
    >
      {/* <!-- dropdown item --> */}
      <div className="py-1" role="none">
        <LinkTo
          href="/langit-ide"
          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
        >
          Eksplorasi
        </LinkTo>
        <a
          href="#"
          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
          role="menuitem"
        >
          Profil
        </a>
        <a
          href="https://myaccount.google.com/"
          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
          role="menuitem"
        >
          Pengaturan Akun
        </a>
        <button
          onClick={signOut}
          className="text-fuchsia-400 block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
          role="menuitem"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

const NotificationItems = () => {
  return (
    <div
      className="origin-top-center absolute right-0 mt-2 top-10 w-64 rounded-md shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="notif-btn"
      id="dropnotif"
    >
      <div className="pt-1" role="none">
        <span className="px-4 py-2 block font-semibold">Notifikasi</span>
        <hr className="shadow" />
        <div>
          <span className="px-4 py-2 block text-sm hover:bg-gray-200 border-b">
            Selamat! Kamu mendapatkan lencana #Pocung
          </span>
          <span className="px-4 py-2 block text-sm hover:bg-gray-200 border-b">
            Idemu tentang telah didukung lebih dari 100 orang
          </span>
          <span className="px-4 py-2 block text-sm hover:bg-gray-200 border-b">
            Idemu tentang telah dilihat lebih dari 1000 kali
          </span>
        </div>
      </div>
    </div>
  );
};
