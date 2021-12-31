import { useContext, useState } from "react";
import { UserContext } from "@modules/context";
import {
  getDocs,
  orderBy,
  limit,
  startAfter,
  collectionGroup,
  db,
  query,
} from "@modules/firebase";
import { docToJSON } from "@modules/helper";
import { LeftSidebar, RightSidebar, Feed, Spinner } from "@modules/composer";

const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(db, "posts"),
    orderBy("dateCreated", "desc"),
    limit(LIMIT)
  );

  const postsFetched = (await getDocs(postsQuery)).docs.map(docToJSON);

  return {
    props: { postsFetched },
  };
}

export default function Sky({ postsFetched }) {
  const { user, username, userData } = useContext(UserContext);
  const [posts, setPosts] = useState(postsFetched);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

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

  return (
    <>
      <div className="text-4xl md:text-7xl font-bold mt-4 mb-7 md:mb-0">
        <h1>
          <span className="text-fuchsia-500">#Langit</span> ide
        </h1>
      </div>

      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-7 my-12">
        <LeftSidebar />

        <div className="col-span-2">
          <div className="mb-4">
            <a href="#" className="px-2 text-xl font-bold">
              Terbaru
            </a>
            <a href="#" className="px-2 text-xl">
              Jelajah
            </a>
          </div>

          <Feed posts={posts} idekiawan={false} />

          {!loading && !postsEnd && (
            <button onClick={getMorePosts} className="hover:underline">
              Lihat lebih banyak
            </button>
          )}

          <Spinner show={loading} />

          {postsEnd && "Kamu mencapai batas akhir"}
        </div>

        <RightSidebar username={username} />
      </div>
    </>
  );
}
