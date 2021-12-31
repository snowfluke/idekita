import { LinkTo } from "@modules/composer";
import { minutesToRead, formatDate } from "@modules/helper";

export default function Feed({ posts, idekiawan }) {
  return posts
    ? posts.map((post, id) => (
        <FeedItem post={post} key={post.slug + id} idekiawan={idekiawan} />
      ))
    : null;
}

const FeedItem = ({ post, idekiawan = false }) => {
  const readTime = minutesToRead(post.content);
  const publishedDate = formatDate(post.dateCreated);

  return (
    <div className="bg-white rounded-md hover:shadow-lg transition duration-500 cursor-pointer hover:border-fuchsia-500 border border-gray-300 py-3 md:py-4 md:px-5 px-4 flex-row mb-7">
      <div className="flex justify-between text-sm">
        <span className="text-opacity-80 text-gray-500">{publishedDate}</span>
      </div>
      <div className="row-span-3 content-center grid my-3">
        <LinkTo href={`/${post.username}/${post.slug}`}>
          <h2 className="font-semibold transition hover:translate-x-2 bg-gray-100 rounded-sm text-xl md:text-2xl border-l-8 px-4 border-fuchsia-500">
            <span>{post.title}</span>
          </h2>
        </LinkTo>
        <div className="text-sm mt-3">
          {post.background.substring(0, 200)}..
        </div>
        <div className="text-opicity-80 text-gray-500 mt-2 text-sm">
          <Tags items={post.tags} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="flex mr-4 items-center">
            <svg
              className="w-7 h-7 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              ></path>
            </svg>
            <span className="text-opacity-80 text-gray-500 ml-1 text-xs md:text-sm">
              {post.cloud}
            </span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-opacity-80 text-gray-500 ml-1 md:text-sm text-xs">
              {readTime}m baca
            </span>
          </div>
        </div>

        <LinkTo href={`/${post.username}`}>
          <div className="flex items-center bg-gray-100 rounded-full pl-5 hover:bg-gray-200 transition-colors">
            <span className="text-fuchsia-500 font-semibold mr-2 md:mr-4 text-xs md:text-base">
              {post.username}
            </span>
            <div className="w-8 h-8">
              <img
                width={50}
                height={50}
                className="rounded-full shadow-sm"
                src={post.photoURL}
                alt={post.username}
              />
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
      className="lowercase mr-2 font-bold hover:underline"
    >
      #{tag}
    </LinkTo>
  ));
