/** Left sidebar components in the main page (/langit-idea route) */

/** Displaying 3 kinds of categories, popular posts, tech posts and farm posts */

import { useEffect, useState } from "react";
import { docToJSON } from "@modules/helper";
import { toast } from "@modules/composer";
import {
  getDocs,
  orderBy,
  where,
  limit,
  collectionGroup,
  db,
  query as q,
  fromMilis,
} from "@modules/firebaser";
import { useRouter } from "next/router";

export default function LeftSidebar() {
  const router = useRouter();
  const [popularPosts, setPopularPosts] = useState([]);
  const [farmPosts, setFarmPosts] = useState([]);
  const [techPosts, setTechPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const date = fromMilis(Date.now() - 604800000);
        const postsQuery = q(
          collectionGroup(db, "posts"),
          where("dateCreated", ">=", date),
          orderBy("dateCreated", "desc"),
          orderBy("cloud", "desc"),
          limit(10)
        );

        const post = (await getDocs(postsQuery)).docs.map(docToJSON);
        const postFiltered = post.sort((a, b) => b.cloud - a.cloud);

        const techAndFarmQuery = q(
          collectionGroup(db, "posts"),
          where("tags", "array-contains-any", ["teknologi", "pertanian"]),
          orderBy("dateCreated", "desc"),
          limit(20)
        );

        const techAndFarmPost = (await getDocs(techAndFarmQuery)).docs.map(
          docToJSON
        );
        const techFiltered = techAndFarmPost.filter((post) =>
          post.tags.includes("teknologi")
        );
        const farmFiltered = techAndFarmPost.filter((post) =>
          post.tags.includes("pertanian")
        );

        setTechPosts(techFiltered);
        setFarmPosts(farmFiltered);
        setPopularPosts(postFiltered);
      };
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, mohon coba kembali 😢");
    }
  }, []);

  return (
    <div className="col-start-1 hidden lg:hidden xl:block space-y-4">
      <h2 className="title-leftsidebar">
        <span className="text-fuchsia-500">#Populer</span> minggu ini
      </h2>
      <div className="card-leftsidebar">
        {popularPosts &&
          popularPosts.map((post, id) => (
            <div
              onClick={() => router.push(`/${post.username}/${post.slug}`)}
              className="item-card-leftsidebar"
              key={id}
            >
              <h3 className="text-card-leftsidebar">{post.title}</h3>
              <p className="tag-card-leftsidebar">#{post.tags[0]}</p>
            </div>
          ))}
      </div>

      <h2 className="title-leftsidebar">
        <span className="text-fuchsia-500">#Teknologi</span>
      </h2>
      <div className="card-leftsidebar">
        {techPosts &&
          techPosts.map((post, id) => (
            <div
              onClick={() => router.push(`/${post.username}/${post.slug}`)}
              className="item-card-leftsidebar"
              key={id}
            >
              <h3 className="text-card-leftsidebar">{post.title}</h3>
            </div>
          ))}
      </div>

      <h2 className="title-leftsidebar">
        <span className="text-fuchsia-500">#Pertanian</span>{" "}
      </h2>
      <div className="card-leftsidebar">
        {farmPosts &&
          farmPosts.map((post, id) => (
            <div
              onClick={() => router.push(`/${post.username}/${post.slug}`)}
              className="item-card-leftsidebar"
              key={id}
            >
              <h3 className="text-card-leftsidebar">{post.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
