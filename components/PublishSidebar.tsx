import { IdeaContentRight } from "@modules/composer";
import { UserContext } from "@modules/contexter";
import { useContext } from "react";
import { markdownhelps } from "@modules/markdowner";

export default function PublishSidebar(props) {
  const { modal } = useContext(UserContext);
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
    {
      name: "#Bantuan",
      icon: "🙋‍♂️",
      onclick: () => {
        modal.openModal({
          title: "Bantuan Penggunaan Markdown",
          content: markdownhelps,
        });
      },
    },
    {
      name: "#Buang",
      icon: "🗑️",
      onclick: props.sidebar.delete,
    },
  ];

  return <IdeaContentRight Top={false} menu={menu} />;
}
