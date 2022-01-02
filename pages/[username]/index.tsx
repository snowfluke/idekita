import { getUserWithUsername, docToJSON, formatDate } from "@modules/helper";
import { Feed } from "@modules/composer";
import Image from "next/image";
import {
  getDocs,
  orderBy,
  where,
  limit,
  startAfter,
  collectionGroup,
  db,
  query,
} from "@modules/firebaser";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "@modules/contexter";
import { Meta } from "@modules/composer"

const LIMIT = 10;
const q = query;

export async function getServerSideProps({ query }) {
  const { username } = query;
  const user = await getUserWithUsername(username);

  if (!user) return { notFound: true };
  let post = null;

  if (user) {
    const postsQuery = q(
      collectionGroup(db, "posts"),
      where("username", "==", username),
      orderBy("dateCreated", "desc"),
      limit(LIMIT)
    );

    post = (await getDocs(postsQuery)).docs.map(docToJSON);
  }

  return { props: { user, post } };
}

export default function Profile({ user, post }) {
  const [posts, setPosts] = useState(post);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const { username: currentUser } = useContext(UserContext);
  const getMorePosts = async () => {
    setLoading(true);
    const lastPost = posts[posts.length - 1];

    const newPostsQuery = query(
      collectionGroup(db, "posts"),
      orderBy("dateCreated", "desc"),
      startAfter(lastPost.dateCreated),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(newPostsQuery)).docs.map(docToJSON);

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  const photoURL = user.photoURL.split("=")[0];
  const idekiawan = currentUser === user.username ? true : false;
  const getTitle = () =>
    Object.values(user.title).map((title) => {
      return (
        <div key={`${title}`} className="mx-1 md:mx-2 mb-4">
          <div className="px-3 py-2 prose bg-white border b-transition border-fuchsia-500 hover:bg-fuchsia-600 cursor-default hover:text-white rounded inline-block">
            <p>{title}</p>
          </div>
        </div>
      );
    });

  return (
    <>
    <Meta
        title="iDekiawan 👨🏻‍🏫 Pasukan iDekita"
        description="Bergabung bersama kami sebagai Idekiawan, mengumpulkan semua ide-ide dan solusi kreatif demi masa depan yang lebih baik lagi"
      />
      <div className="big-heading print:hidden">
        <h1>
          <span className="text-fuchsia-500">#Idekiawan</span> kita
        </h1>
      </div>

      <div className="flex print:hidden justify-between md:justify-end mb-7 mt-5 md:mb-0">
        <button
          onClick={() => window.print()}
          className="btn-fuchsia hover:scale-105 inline-block hover:-rotate-6"
        >
          #Cetak
        </button>

        <div className="relative inline-block text-left">
          <div
            id="report-btn"
            className="ml-7 cursor-pointer"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <div className="report-btn mt-1"></div>
            <div className="report-btn my-1"></div>
            <div className="report-btn"></div>
          </div>

          <div
            className="dropdown-list-nav hidden origin-top-right w-20"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="report-btn"
            id="dropreport"
          >
            <div role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-fuchsia-500 hover:text-white b-transition rounded-md"
                role="menuitem"
              >
                Report
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-4 xl:gap-10 md:grid-cols-2 md:gap-5 grid-cols-1">
        <div className="flex justify-center md:col-span-2 xl:col-span-1">
          <Image
            src={photoURL}
            alt={user.displayName}
            width={400}
            className="rounded-full border-4 p-1 border-fuchsia-500 shadow-sm cursor-pointer"
            height={400}
          />
        </div>

        <div className="xl:col-span-3 md:col-span-2 xl:text-left grid content-center mt-7 xl:mt-0 text-center">
          <p className="mb-2 font-semibold text-gray-400">
            Sejak <span>{formatDate(user.dateJoined)}</span>
          </p>
          <p className="md:text-6xl text-4xl font-semibold mb-3">
            {user.displayName}
          </p>
          <p className="text-xl font-semibold">
            Kawaii young developer looking for inner peace, hell yea. Ultimate
            cringe human being ever exist. Stop simping 👋
          </p>
          <p className="text-xl text-fuchsia-500 font-semibold">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap mx-0 md:mx-10 justify-center mt-10 mb-7 text-fuchsia-500 font-semibold">
        {getTitle()}
      </div>

      <hr className="shadow-top h-[3px] bg-white hidden md:block mb-8" />

      <div className="text-center mt-5 mb-10 print:hidden">
        <a href="#" className="text-2xl font-semibold">
          #populer
        </a>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-4">
        <Feed posts={post} idekiawan={idekiawan} />
      </div>

      <div className="text-center mb-5 mt-5 print:hidden">
        <a href="#" className="text-2xl font-semibold">
          #lebihbanyak
        </a>
      </div>
    </>
  );
}
