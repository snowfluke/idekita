import { useRouter } from "next/router";
import { useState } from "react";
import { IdeaContent } from "@modules/composer";
import { docToJSON, getUserWithUsername } from "@modules/helper";
import { db, doc, getDoc, collectionGroup, getDocs } from "@modules/firebaser";
import { IdeaLayout } from "@modules/layouter";
import { toast, IdeaContentRight } from "@modules/composer";
import { emoji } from "@modules/emojier";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userData = await getUserWithUsername(username);

  let post;

  if (userData) {
    const postRef = doc(db, `users/${userData.uid}/posts`, slug);
    const postData = await getDoc(postRef);
    post = docToJSON(postData);
  }

  return {
    props: { post, userData },
    revalidate: 60 * 1000,
  };
}

export async function getStaticPaths({ params }) {
  const snapshot = await getDocs(collectionGroup(db, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function IdeaProfile({ post, userData }) {
  const router = useRouter();
  const [cloud, setCloud] = useState(parseInt(post.cloud));

  const ideaContentMenu = [
    {
      name: "#Dukung",
      icon: "✊",
      onclick: () => {
        setCloud(cloud + 1);
        toast.success("Berhasil memberikan dukungan 💪");
      },
    },
    {
      name: "#Bagikan",
      icon: "🖐",
      onclick: () => router.push("#idea-header"),
    },
    {
      name: "#Kirim Email",
      icon: "🤝",
      onclick: () =>
        router.push(
          encodeURI(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${userData.email}&su=iDekita - ${post.title}&body=Hai, ${userData.displayName} 👋! Sehubungan dengan ide yang Anda publikasi di tautan https://idekita.id/${post.username}/${post.slug}. Saya bermaksud untuk berdiskusi lebih jauh mengenai hal itu. `
          )
        ),
    },
    {
      name: "#Kembali",
      icon: "👈",
      onclick: () => router.back(),
    },
  ];

  const TopElement = () => {
    return (
      <div className=" prose flex-1 font-bold text-3xl p-5 rounded-md content-center">
        <button className="focus:animate-bounce duration-1000 transition select-none">
          {emoji.awan}
          {cloud}
        </button>
      </div>
    );
  };

  return (
    <IdeaLayout
      MainComponent={<IdeaContent post={post} userData={userData} />}
      SidebarComponent={
        <IdeaContentRight menu={ideaContentMenu} TopElement={TopElement} />
      }
    />
  );
}
