import { LinkTo } from "@modules/composer";

export default function MiddleMenu() {
  return (
    <ul className="md:flex text-center mt-3 md:mt-0" id="menu1">
      <LinkTo href="#">
        <li className="mb-1 md:mb-0 md:mx-3 hover:border-b hover:text-fuchsia-500 border-fuchsia-500 b-transition">
          #Kebijakan
        </li>
      </LinkTo>
      <LinkTo href="#">
        <li className="mb-1 md:mb-0 md:mx-3 hover:border-b border-fuchsia-500 hover:text-fuchsia-500 b-transition">
          #Terminologi
        </li>
      </LinkTo>
      <a href="#">
        <li className="md:mx-3 hover:border-b border-fuchsia-500 hover:text-fuchsia-400 b-transition">
          #Dukungan
        </li>
      </a>
      <hr className="mt-4 md:hidden border-fuchsia-300" />
    </ul>
  );
}
