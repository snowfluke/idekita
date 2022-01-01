import { LinkTo } from "@modules/composer";

export default function MiddleMenu() {
  return (
    <ul className="md:flex text-center mt-3 md:mt-0" id="menu1">
      <LinkTo href="#">
        <li className="li-item-navmid">#Kebijakan</li>
      </LinkTo>
      <LinkTo href="#">
        <li className="li-item-navmid">#Terminologi</li>
      </LinkTo>
      <a href="#">
        <li className="li-item-navmid">#Dukungan</li>
      </a>
      <hr className="mt-4 md:hidden border-fuchsia-300" />
    </ul>
  );
}
