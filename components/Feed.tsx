/** Components to display in the /langit-ide route, provide recent and random post  */

import { LinkTo } from "@modules/composer";
import { minutesToRead, formatDate } from "@modules/helper";
import { emoji } from "@modules/emojier";
import Image from "next/image";

export default function Feed({ posts, idekiawan }) {
  return posts
    ? posts.map((post, id) => (
        <FeedItem post={post} key={post.slug + id} idekiawan={idekiawan} />
      ))
    : null;
}

const FeedItem = ({ post, idekiawan = false }) => {
  const readTime = minutesToRead(post.content);
  const publishedDate = formatDate(post.dateUpdated);

  return (
    <div className="border-2 border-gray-300 p-4 mb-7 bg-white rounded-md b-transition hover:border-fuchsia-500 hover:shadow-lg">
      <div>
        <span className="text-opacity-feed">
          {post.edited && "Diubah"} {publishedDate}
        </span>
      </div>
      <div className="grid my-3 content-center">
        <LinkTo href={`/${post.username}/${post.slug}`}>
          <h2 className="font-semibold b-transition bg-gray-100 rounded-md text-xl md:text-2xl border-l-8 px-4 py-2 border-fuchsia-500 hover:translate-x-2">
            {post.title}
          </h2>
        </LinkTo>
        <div className="text-sm mt-3 text-justify">
          {post.background.substring(0, 200)}..
        </div>
        <div className="mt-2 text-gray-500 text-sm space-x-2">
          <Tags items={post.tags} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="text-xl pt-[3px]">{emoji.awan}</span>
            <span className="text-icon-feed">{post.cloud}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg">{emoji.waktu}</span>
            <span className="text-icon-feed">{readTime}m baca</span>
          </div>
        </div>

        <LinkTo
          href={idekiawan ? `/mesin-ide/${post.slug}` : `/${post.username}`}
        >
          <div className="flex items-center bg-gray-100 rounded-full pl-5 hover:bg-gray-200 transition-colors">
            <span className="text-fuchsia-500 font-semibold mr-2 md:mr-4 text-xs md:text-base">
              {idekiawan ? "Ubah ide" : post.username}
            </span>
            <div className="w-8 h-8">
              {post.photoURL && (
                <Image
                  src={post.photoURL || "/avatar.png"}
                  alt={post.username}
                  className="rounded-full shadow-sm"
                  width={50}
                  height={50}
                />
              )}
            </div>
          </div>
        </LinkTo>
      </div>
    </div>
  );
};

const Tags = ({ items }) =>
  items.map((tag) => (
    <LinkTo
      href={`/tag/${tag}`}
      key={tag}
      className="lowercase font-bold hover:text-fuchsia-500 b-transition"
    >
      #{tag}
    </LinkTo>
  ));
