import { toast, IdeaContentRight } from "@modules/composer";
import { useRouter } from "next/router";

export default function PublishSidebar(props) {
  const router = useRouter();
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
    {
      name: "#Buang",
      icon: "😢",
      onclick: () => {
        toast.error("Ide telah dibuang 😥");
        router.back();
      },
    },
  ];

  return <IdeaContentRight TopElement={false} menu={menu} />;
}
