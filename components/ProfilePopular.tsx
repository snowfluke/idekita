/** Pretty much the same as ProfileRecent.tsx component, the main different is that this component is default rendered at the first time */
/** Also the paginated query different */

import { Feed, Spinner, toast } from "@modules/composer";
import { useState } from "react";
import { docToJSON } from "@modules/helper";

import {
  getDocs,
  orderBy,
  limit,
  startAfter,
  collectionGroup,
  db,
  query as q,
} from "@modules/firebaser";

export default function ProfilePopular({ post, idekiawan }) {
  const [posts, setPosts] = useState(post);
  const [postsEnd, setPostsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMorePosts = async () => {
    try {
      setLoading(true);
      const lastPost = posts[posts.length - 1];

      const newPostsQuery = q(
        collectionGroup(db, "posts"),
        orderBy("cloud", "desc"),
        startAfter(lastPost.cloud),
        limit(10)
      );

      const newPosts = (await getDocs(newPostsQuery)).docs.map(docToJSON);
      setPosts(posts.concat(newPosts));

      if (newPosts.length < 10) {
        setPostsEnd(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, coba kembali nanti");
    }
  };

  return (
    <>
      {posts && (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-4">
          <Feed posts={posts} idekiawan={idekiawan} />
        </div>
      )}

      {!loading && !postsEnd && (
        <div className="flex justify-center my-10">
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
