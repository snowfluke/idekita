import { getUserWithUsername, docToJSON, formatDate } from "@modules/helper";
import { Feed } from "@modules/composer";
import { badges } from "@modules/markdowner";
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
import { useContext, Fragment } from "react";
import { UserContext } from "@modules/contexter";
import { Meta } from "@modules/composer";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";

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
  const router = useRouter();
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
    Object.values(user.title).map((idtitle, id) => {
      let title = badges[`${idtitle}`];
      return (
        <Popover key={id} className="relative outline-none">
          <Popover.Button className={"outline-none"}>
            <div className="mx-1 md:mx-2 mb-4">
              <div className="px-3 py-2 article-prose prose-a:no-underline prose-a:hover:text-white bg-white border b-transition border-fuchsia-500 hover:bg-fuchsia-600 cursor-default rounded inline-block">
                <a>
                  {title?.badge} {title?.name}
                </a>
              </div>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute  z-10 w-screen max-w-sm -translate-x-1/3 lg:max-w-1xl">
              <div className="text-sm text-center bg-white p-2 font-normal rounded-lg shadow-md">
                {title?.desc}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      );
    });

  return (
    <>
      <Meta
        title={`Idekiawan 👨🏻‍🏫 ${user.displayName}`}
        description="Bergabung bersama kami sebagai Idekiawan, mengumpulkan semua ide-ide dan solusi kreatif demi masa depan yang lebih baik lagi"
      />
      <div className="big-heading print:hidden">
        <h1>
          <span className="text-fuchsia-500">#Idekiawan</span> kita
        </h1>
      </div>

      <div className="flex space-x-2 print:hidden justify-between md:justify-end mb-7 mt-5 md:mb-0">
        <button
          onClick={router.back}
          className="btn-fuchsia-reverse hover:scale-105 inline-block hover:-rotate-6 font-bold px-4 sm:px-8"
        >
          {"<"}
        </button>
        <button
          onClick={() =>
            router.push(
              encodeURI(
                `https://mail.google.com/mail/?view=cm&fs=1&to=admidekita@gmail.com&su=iDekita - Laporan Pelanggaran Kebijakan&body=Selamat siang, Tim iDekita. Saya ingin melaporkan salah satu akun Idekiawan dengan nama pengguna #${post.username} ( https://idekita.id/${post.username}/ ) karena terbukti melakukan pelanggaran ...`
              )
            )
          }
          className="btn-fuchsia-reverse hover:scale-105 inline-block hover:-rotate-6 px-6 sm:px-8"
        >
          #Laporkan
        </button>
        <button
          onClick={() => window.print()}
          className="btn-fuchsia hover:scale-105 inline-block hover:-rotate-6 px-6 sm:px-8"
        >
          #Cetak
        </button>
      </div>

      <div className="grid xl:grid-cols-4 xl:gap-10 md:grid-cols-2 md:gap-5 grid-cols-1 mt-10">
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
          <p className="text-xl font-semibold">{user.bio}</p>
          <p className="text-xl text-fuchsia-500 font-semibold select-all">
            {user.email}
          </p>
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
