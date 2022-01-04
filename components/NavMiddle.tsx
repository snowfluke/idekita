import { UserContext } from "@modules/contexter";
import { useContext } from "react";
import { policies, supporters, terminologies } from "@modules/markdowner";
import { LinkTo } from "@modules/composer";

const credentials = [
  {
    name: "#Kebijakan",
    title: "Kebijakan Privasi dan Penggunaan iDekita",
    content: policies,
  },
  {
    name: "#Terminologi",
    title: "Terminologi iDekita",
    content: terminologies,
  },
  {
    name: "#Dukungan",
    title: "Terima Kasih Kepada",
    content: supporters,
  },
];

export default function MiddleMenu({toggle}) {
  const { modal } = useContext(UserContext);
  return (
    <ul className={toggle}>
      {Credentials(modal)}
      <LinkTo target="_blank" href="https://drive.google.com/file/d/1iixidxwUlPqslumHRVjmmyzz_CdHiEII/view?usp=sharing">
        <li className="li-item-navmid">#Proposal</li>
      </LinkTo>

      <hr className="mt-4 md:hidden border-fuchsia-300" />
    </ul>
  );
}

function Credentials(modal) {
  return credentials.map((credential) => (
    <li
      key={credential.name}
      className="li-item-navmid"
      onClick={() =>
        modal.openModal({
          title: credential.title,
          content: credential.content,
        })
      }
    >
      {credential.name}
    </li>
  ));
}
