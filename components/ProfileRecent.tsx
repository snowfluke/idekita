import { Feed, Spinner } from "@modules/composer";
import { useEffect, useState } from "react";
import { docToJSON, getUserWithUsername } from "@modules/helper";
import { toast } from "@modules/composer";
import {
  getDocs,
  orderBy,
  where,
  limit,
  startAfter,
  collectionGroup,
  db,
  query as q,
} from "@modules/firebaser";

export async function getServerSideProps({ query }) {
  const { username } = query;
  const user = await getUserWithUsername(username);

  if (!user) return { notFound: true };
  let post = null;

  if (user) {
    const postsQuery = q(
      collectionGroup(db, "posts"),
      where("username", "==", username),
      orderBy("dateUpdated", "desc"),
      limit(10)
    );

    post = (await getDocs(postsQuery)).docs.map(docToJSON);
  }

  return { props: { user, post } };
}

export default function ProfileRecent(props) {
  const [posts, setPosts] = useState([]);
  const [postsEnd, setPostsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const lastPost = posts[posts.length - 1];

    const newPostsQuery = q(
      collectionGroup(db, "posts"),
      orderBy("dateUpdated", "desc"),
      startAfter(lastPost.dateUpdated),
      limit(10)
    );
    const newPosts = (await getDocs(newPostsQuery)).docs.map(docToJSON);
    setPosts(posts.concat(newPosts));

    if (newPosts.length < 10) {
      setPostsEnd(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const postsQuery = q(
          collectionGroup(db, "posts"),
          where("username", "==", props.username),
          orderBy("dateUpdated", "desc"),
          limit(10)
        );

        let post = (await getDocs(postsQuery)).docs.map(docToJSON);
        setPosts(post);
      };

      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, mohon coba beberapa saat lagi");
    }
  }, []);

  return (
    <>
      {posts && (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-4">
          <Feed posts={posts} idekiawan={props.idekiawan} />
        </div>
      )}

      {!loading && !postsEnd && (
        <div className="flex justify-center">
          <button
            onClick={getMorePosts}
            className="btn-fuchsia rounded-full hover:bg-fuchsia-600"
          >
            Lihat lebih banyak
          </button>
        </div>
      )}

      <Spinner show={loading} />
      {postsEnd && (
        <p className="text-center">
          Kamu telah mencapai batas akhir eksplorasi
        </p>
      )}
    </>
  );
}
