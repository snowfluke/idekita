import { useContext } from "react";
import { UserContext } from "@modules/contexter";
import { LinkTo } from "@modules/composer";
import { terminologies, policies } from "@modules/markdowner";
import { emoji } from "@modules/emojier";

export default function RightSidebar({ username = "" }) {
  const { modal } = useContext(UserContext);

  const menuList = [
    {
      icon: emoji.rumah,
      name: "#Beranda",
      route: "/langit-ide",
    },
    {
      icon: emoji.profil,
      name: "#Profil",
      route: `/${username}`,
      linkto: true,
      requireLogin: true,
    },
    {
      icon: emoji.lampu,
      name: "#Buat Ide",
      route: `/mesin-ide`,
    },
    {
      icon: emoji.buku,
      name: "#Terminologi",
      requireModal: true,
      title: "Terminologi iDekita",
      content: terminologies,
    },
    {
      icon: emoji.penggaris,
      name: "#Kebijakan",
      requireModal: true,
      title: "Kebijakan Privasi dan Penggunaan iDekita",
      content: policies,
    },
    {
      icon: emoji.pintu,
      name: "#Keluar",
      requireLogin: true,
      route: "/bergabung",
    },
  ];

  const Menus = () => (
    <>
      {menuList
        .filter((menu) => (!username ? !menu.requireLogin : true))
        .map((menu) => (
          <div key={menu.name}>
            <li className={menu.icon !== emoji.pintu ? "li-r-sidebar hover:text-fuchsia-500" : "li-r-sidebar text-fuchsia-500"}>
              {menu.requireModal ? (
                <a
                  className="cursor-pointer"
                  onClick={() =>
                    modal.openModal({
                      title: menu.title,
                      content: menu.content,
                    })
                  }
                >
                  <div className="flex space-x-2">
                    <div className="flex-none w-8 bg-gray-100 rounded-full content-center text-center">{menu.icon}</div>
                    <div className={menu.icon !== emoji.pintu ? "flex-1 w-64" : "flex-1 w-64 text-fuchsia-500"}>{menu.name}</div>
                  </div>
                </a>
              ) : (
                <LinkTo href={menu.route}>
                  <div className="flex space-x-2">
                    <div className="flex-none w-8 bg-gray-100 rounded-full content-center text-center">{menu.icon}</div>
                    <div className={menu.icon !== emoji.pintu ? "flex-1 w-64" : "flex-1 w-64 text-fuchsia-500"}>{menu.name}</div>
                  </div>
                </LinkTo>
              )}
            </li>
          </div>
        ))}
    </>
  );

  return (
    <div className="relative md:block hidden">
      <ul className="sticky top-24 text-lg font-semibold prose prose-a:no-underline">
        <Menus />
      </ul>
    </div>
  );
}
