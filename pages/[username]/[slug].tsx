/** post route to show idea published by the [username] params on the URL */

import { useRouter } from "next/router";
import { docToJSON, getUserWithUsername } from "@modules/helper";
import { db, doc, getDoc, collectionGroup, getDocs } from "@modules/firebaser";
import { IdeaLayout } from "@modules/layouter";
import {
  IdeaContentRight,
  IdeaContent,
  CheckLogin,
  LinkTo,
  Cloud,
  Meta,
} from "@modules/composer";
import { emoji } from "@modules/emojier";
import { useState } from "react";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDataPost = await getUserWithUsername(username);

  let post;

  if (userDataPost) {
    const postRef = doc(db, `users/${userDataPost.uid}/posts`, slug);
    const postData = await getDoc(postRef);
    post = docToJSON(postData);
  }

  return {
    props: { post, userDataPost },
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

export default function IdeaProfile({ post, userDataPost }) {
  const router = useRouter();
  let initialCloud = post?.cloud || 0;
  const [cloudCount, setCloudCount] = useState(initialCloud);
  const ideaContentMenu = [
    {
      name: "#Bagikan",
      icon: emoji.angkattangan,
      onclick: () => router.push("#idea-header"),
    },
    {
      name: "#Kirim Email",
      icon: emoji.salaman,
      onclick: () =>
        router.push(
          encodeURI(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${userDataPost.email}&su=iDekita - ${post?.title}&body=Hai, ${userDataPost.displayName} ${emoji.hai}! Sehubungan dengan ide yang Anda publikasi di tautan https://idekita.id/${post?.username}/${post?.slug}. Saya bermaksud untuk berdiskusi lebih jauh mengenai hal itu. `
          )
        ),
    },
    {
      name: "#Laporkan",
      icon: emoji.kepalan,
      onclick: () =>
        router.push(
          encodeURI(
            `https://mail.google.com/mail/?view=cm&fs=1&to=admidekita@gmail.com&su=iDekita - Laporan Pelanggaran Kebijakan&body=Selamat siang, Tim iDekita. Saya ingin melaporkan sebuah publikasi ide berjudul ${post?.title} ( https://idekita.id/${post?.username}/${post?.slug} ) karena terbukti melakukan pelanggaran ...`
          )
        ),
    },
    {
      name: "#Kembali",
      icon: emoji.tunjuk,
      onclick: () => router.back(),
    },
  ];

  const updateCloudState = () => setCloudCount(cloudCount + 1);
  const CloudStat = () => {
    return (
      <div className="prose flex-1 font-bold text-3xl pl-5 pt-2 content-center">
        <button className="focus:animate-bounce duration-1000 b-transition select-none">
          <span className="pr-3">{emoji.awan}</span>
          {cloudCount}
        </button>
      </div>
    );
  };

  return (
    <>
      <Meta
        title={`iDekita ✨ ${post?.title}`}
        description={`${post?.background}`}
      />
      <IdeaLayout>
        <IdeaContent post={post} userDataPost={userDataPost} />
        <IdeaContentRight menu={ideaContentMenu}>
          <>
            <CloudStat />

            <CheckLogin
              fallback={
                <LinkTo href={"/bergabung"} className="ml-5 py-2 inline-block">
                  Bergabung dan beri dukungan
                </LinkTo>
              }
            >
              <Cloud post={post} update={() => updateCloudState()} />
            </CheckLogin>
          </>
        </IdeaContentRight>
      </IdeaLayout>
    </>
  );
}
