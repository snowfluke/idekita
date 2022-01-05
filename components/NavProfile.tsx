/** Nav profile on the right hand side, showed when successfully login */
/** Containing the profile pictures, as well as the notifications and other dropdown menus */

import { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import { signOut } from "@modules/helper";
import { LinkTo } from "@modules/composer";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { emoji } from "@modules/emojier";

export default function NavProfile({ user, toggle }) {
  const [userPhoto, setUserPhoto] = useState("/avatar.png");

  const router = useRouter();

  useEffect(() => {
    user?.photoURL && setUserPhoto(user?.photoURL);
  }, [user]);
  return (
    <>
      <div className={toggle}>
        <ul className="flex items-center justify-center md:justify-end list-none">
          <li className="list-none">
            <LinkTo href={"/langit-ide"} className="li-item-profile">
              {emoji.rumah}
            </LinkTo>
          </li>
          <li className="list-none">
            <LinkTo href={"/mesin-ide"} className="li-item-profile">
              {emoji.edit}
            </LinkTo>
          </li>
          <li className="list-none">
            <Notification notifications={user?.notifications} />
          </li>
          <li className="ml-2 md:ml-4 pt-2 rounded">
            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button className="inline-flex justify-center focus:outline-none">
                  <div className="w-10 h-10 cursor-pointer">
                    {userPhoto && (
                      <Image
                        width={50}
                        height={50}
                        className="rounded-full border-2 p-[2px] border-fuchsia-500 shadow-sm hover:border-dashed b-transition hover:scale-105 hover:-rotate-3"
                        src={userPhoto || "/avatar.png"}
                        alt={user?.displayName}
                      />
                    )}
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute flex flex-col right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <LinkTo
                        className={
                          active
                            ? "li-item-profile-menu-active"
                            : "li-item-profile-menu"
                        }
                        href="/langit-ide"
                      >
                        {emoji.dunia} Eksplorasi
                      </LinkTo>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <LinkTo
                        className={
                          active
                            ? "li-item-profile-menu-active"
                            : "li-item-profile-menu"
                        }
                        href={`/${user.username}`}
                      >
                        {emoji.profil} Profil
                      </LinkTo>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <LinkTo
                        className={
                          active
                            ? "li-item-profile-menu-active"
                            : "li-item-profile-menu"
                        }
                        onClick={() => signOut()}
                      >
                        {emoji.pintu} Keluar
                      </LinkTo>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        </ul>
      </div>
    </>
  );
}

/**
 * Render all recent notification
 * @param param0 notifications list
 * @returns Notification components
 */
const Notification = ({ notifications }) => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      let latestNotifications;
      if (!notifications) {
        latestNotifications = JSON.parse('{"recent":[]}');
        setRecent(latestNotifications.recent.splice(0, 5).reverse());
        return;
      }
      latestNotifications = JSON.parse(notifications);
      setRecent(latestNotifications.recent.splice(0, 5).reverse());
      return;
    } catch (error) {
      console.log(error);
    }
  }, [notifications]);

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button className="li-item-profile py-[6px] focus:bg-gray-300 inline-flex justify-center focus:outline-none">
          {emoji.lonceng}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute flex flex-col right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="text-bold py-2 px-4 border-b-gray-200 border-2">
            Pemberitahuan
          </div>

          {recent.map((notif, id) => (
            <Menu.Item key={id}>
              {({ active }) => (
                <LinkTo
                  className={
                    active
                      ? "li-item-profile-menu-active text-sm"
                      : "li-item-profile-menu text-sm"
                  }
                >
                  {notif}
                </LinkTo>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
