import { IdeaContentRight } from "@modules/composer";
import { useRouter } from "next/router";

export default function PublishSidebar(props) {
  const router = useRouter();
  const menu = [
    {
      name: "#Publikasi",
      icon: "🚀",
      onclick: props.sidebar.submit,
    },
    {
      name: "#Pratinjau",
      icon: "👀",
      onclick: props.sidebar.preview,
    },
    { name: "#Bantuan", icon: "🙋‍♂️", onclick: () => {} },
    {
      name: "#Buang",
      icon: "🗑️",
      onclick: props.sidebar.delete,
    },
  ];

  return <IdeaContentRight TopElement={false} menu={menu} />;
}
