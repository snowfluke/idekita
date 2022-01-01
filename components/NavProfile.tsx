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
          <li className="list-none">
            <LinkTo href={"/langit-ide"} className="li-item-profile">
              🏠
            </LinkTo>
          </li>
          <li className="list-none">
            <LinkTo href={"/mesin-ide"} className="li-item-profile">
              📝
            </LinkTo>
          </li>
          <li className="list-none">
            <button className="li-item-profile py-[6px] focus:bg-gray-300" aria-expanded="true" aria-haspopup="true" onClick={() => showNotif()}>
              🔔
            </button>
          </li>
          <li className="md:ml-4 rounded">
            <div className="flex md:space-x-2">
              <div className="w-10 h-10 cursor-pointer" onClick={() => showMenu()}>
                <img width={50} height={50} className="rounded-full border-2 p-[2px] border-fuchsia-500 shadow-sm hover:border-dashed b-transition hover:scale-105 hover:-rotate-3" src={user?.photoURL} alt={user?.displayName} />
              </div>
            </div>
          </li>
          {showNotifMenu && <NotificationItems />}
          {showProfileMenu && <ProfileMenu username={user?.username} />}
        </ul>
      </div>
    </>
  );
}

const ProfileMenu = ({ username }) => {
  return (
    <div className="origin-top-right dropdown-list-nav w-48 py-3" role="menu" aria-orientation="vertical" aria-labelledby="menu-btn" id="dropnav">
      {/* <!-- dropdown item --> */}
      <div role="none">
        <LinkTo href="/langit-ide" className="li-item-profile-menu">
          🌈 Eksplorasi
        </LinkTo>
        <a href="#" className="li-item-profile-menu" role="menuitem">
          🙎🏻‍♂️ <span className="pl-[3px]">Profil</span>
        </a>
        <a href="https://myaccount.google.com/" className="li-item-profile-menu" role="menuitem">
          ⚙️ Pengaturan Akun
        </a>
        <a onClick={signOut} className="li-item-profile-menu font-semibold" role="menuitem">
          🚪
          <span className="text-fuchsia pl-2 cursor-pointer">Keluar</span>
        </a>
      </div>
    </div>
  );
};

const NotificationItems = () => {
  return (
    <div className="origin-top-center dropdown-list-nav w-64" role="menu" aria-orientation="vertical" aria-labelledby="notif-btn" id="dropnotif">
      <div className="pt-1" role="none">
        <span className="px-4 py-2 block font-semibold">Notifikasi</span>
        <hr className="shadow" />
        <div>
          <span className="dropdown-list-notif">Selamat! Kamu mendapatkan lencana #Pocung</span>
          <span className="dropdown-list-notif">Idemu tentang telah didukung lebih dari 100 orang</span>
          <span className="dropdown-list-notif">Idemu tentang telah dilihat lebih dari 1000 kali</span>
        </div>
      </div>
    </div>
  );
};
