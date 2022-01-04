/** Route for user profile */

import { useState, useContext } from "react";
import { UserContext } from "@modules/contexter";
import dynamic from "next/dynamic";
import { getUserWithUsername, docToJSON } from "@modules/helper";
import {
  ProfileOption,
  ProfileInfo,
  ProfileBadge,
  ProfilePopular,
  Meta,
} from "@modules/composer";
import {
  getDocs,
  orderBy,
  where,
  limit,
  collectionGroup,
  db,
  query as q,
} from "@modules/firebaser";
import { emoji } from "@modules/emojier";

const ProfileRecent = dynamic(() => import("@components/ProfileRecent"));

export async function getServerSideProps({ query }) {
  const { username } = query;
  const user = await getUserWithUsername(username);

  if (!user) return { notFound: true };
  let post = null;

  if (user) {
    const postsQuery = q(collectionGroup(db, "posts"), where("username", "==", username), orderBy("cloud", "desc"), limit(10));

    post = (await getDocs(postsQuery)).docs.map(docToJSON);
  }

  return { props: { user, post } };
}

export default function Profile({ user, post }) {
  const [isPopular, setIsPopular] = useState(true);
  const { username: currentUser } = useContext(UserContext);

  const photoURL = user.photoURL.split("=")[0];
  const idekiawan = currentUser === user.username ? true : false;

  return (
    <>
      <Meta title={`Idekiawan ${emoji.ilmuwan} ${user.displayName}`} description="Bergabung bersama kami sebagai Idekiawan, mengumpulkan semua ide-ide dan solusi kreatif demi masa depan yang lebih baik lagi" />
      <div className="big-heading print:hidden">
        <h1>
          <span className="text-fuchsia-500">#Idekiawan</span> kita
        </h1>
      </div>

      <ProfileOption username={user.username} />
      <ProfileInfo user={user} photoURL={photoURL} idekiawan={idekiawan} />
      <ProfileBadge user={user} />

      {post && (
        <>
          <hr className="shadow-top h-[3px] bg-white hidden md:block mb-8" />
          <div className="text-center mt-5 mb-10 print:hidden">
            <a onClick={() => setIsPopular(!isPopular)} className="text-2xl font-semibold cursor-pointer hover:text-fuchsia-500 transition duration-500">
              {isPopular ? "#populer" : "#terbaru"}
            </a>
          </div>

          {isPopular && <ProfilePopular post={post} idekiawan={idekiawan} />}
          {!isPopular && <ProfileRecent idekiawan={idekiawan} username={user.username} />}
        </>
      )}
    </>
  );
}
