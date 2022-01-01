import { toast, IdeaContentRight } from "@modules/composer";

export default function PublishSidebar(props) {
  const menu = [
    {
      name: "#Publikasi",
      icon: "🚀",
      onclick: () => {
        toast.success("Pesan berhasil di publikasi! 🎉");
      },
    },
    {
      name: "#Pratinjau",
      icon: "👀",
      onclick: props.preview.onclick,
    },
    { name: "#Bantuan", icon: "🙋‍♂️", onclick: () => {} },
    { name: "#Buang", icon: "😢", onclick: () => {} },
  ];

  return <IdeaContentRight TopElement={false} menu={menu} />;
}
