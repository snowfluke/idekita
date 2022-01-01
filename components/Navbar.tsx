import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@modules/contexter";
import { signIn } from "@modules/helper";
import { NavMiddle, NavSearch, NavProfile, LinkTo } from "@modules/composer";

export default function Navbar() {
  const router = useRouter();
  const { userData, username } = useContext(UserContext);
  const isLandingPage = router.pathname === "/" ? true : false;

  return (
    <div className="bg-gray-100 shadow-md fixed top-0 w-full z-50 print:hidden">
      <div className="w-[80%] m-auto p-3">
        <nav className="md:flex justify-between items-center">
          <div className="flex justify-between">
            {/* <!-- logo --> */}
            <LinkTo
              href={"/"}
              className="inline-block text-fuchsia-600 text-2xl font-semibold cursor-pointer"
            >
              iDekita
            </LinkTo>

            {/* <!-- burger --> */}
            <div
              id="burger"
              className="cursor-pointer md:hidden float-right text-center leading-snug"
            >
              <div className="burger-div mt-2"></div>
              <div className="burger-div my-[5px]"></div>
              <div className="burger-div"></div>
            </div>
          </div>

          {/* <!-- menu center --> */}

          {isLandingPage && <NavMiddle />}
          {!isLandingPage && <NavSearch />}

          {/* <!-- menu right --> */}

          {username && <NavProfile user={userData} />}
          {!username && (
            <ul
              className="items-center md:flex text-center mt-3 md:mt-0 mb-3 md:mb-0"
              id="menu2"
            >
              <a onClick={signIn}>
                <li className="mb-2 md:mb-0 hover:border-b border-fuchsia-500 hover:text-fuchsia-500 b-transition cursor-pointer">
                  #Masuk
                </li>
              </a>
              <a href="/bergabung">
                <li className="md:ml-5 text-fuchsia-500 px-3 py-1 border border-fuchsia-500 rounded hover:bg-fuchsia-500 hover:text-white b-transition">
                  #Bergabung
                </li>
              </a>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
}
