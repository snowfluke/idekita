/** Sidebar Components used in /mesin-ide route */

import { IdeaContentRight } from "@modules/composer";
import { UserContext } from "@modules/contexter";
import { useContext } from "react";
import { markdownhelps } from "@modules/markdowner";
import { useRouter } from "next/router";
import { emoji } from "@modules/emojier";

/**
 * Publish sidebar components inheriting method of state from the parents
 * @param props props of various method used on the menu
 * @returns Sidebar Components
 */
export default function PublishSidebar(props) {
  const { modal } = useContext(UserContext);
  const router = useRouter();

  const menu = [
    {
      name: "#Publikasi",
      icon: emoji.roket,
      onclick: props.sidebar.submit,
    },
    {
      name: "#Pratinjau",
      icon: emoji.mata,
      onclick: props.sidebar.preview,
    },
    {
      name: "#Bantuan",
      icon: emoji.ngacung,
      onclick: () => {
        modal.openModal({
          title: "Bantuan Penggunaan Markdown",
          content: markdownhelps,
        });
      },
    },
    {
      name: "#Kembali",
      icon: emoji.kembali,
      onclick: router.back,
    },
    {
      name: "#Buang",
      icon: emoji.tempatsampah,
      onclick: props.sidebar.delete,
    },
  ];

  return <IdeaContentRight Top={false} menu={menu} />;
}
