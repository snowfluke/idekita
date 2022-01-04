/** Main components to display a post from a markdown */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkTo } from "@modules/composer";
import { formatDate, minutesToRead } from "@modules/helper";
import { useContext } from "react";
import { UserContext } from "@modules/contexter";

export default function IdeaContent({ post, userDataPost }) {
  const { username } = useContext(UserContext);
  const publishedDate = formatDate(post.dateUpdated);
  const readTime = minutesToRead(post.content);

  const Tag = () =>
    post.tags.map((tag) => {
      return (
        <LinkTo key={tag} href={`/tag/${tag}`} className="mr-3">
          #{tag}
        </LinkTo>
      );
    });

  return (
    <div className="article-wrapper">
      <article className="article-prose">
        <h1 id="idea-header" className="scroll-mt-36">
          {post.title}
        </h1>
        {username === post.username && (
          <div className="flex content-center w-full justify-center p-2 cursor-pointer hover:bg-fuchsia-100 rounded-md mb-5 border-2 border-fuchsia-500">
            <LinkTo
              className="text-lg no-underline w-full h-full text-center"
              href={`/mesin-ide/${post.slug}`}
            >
              Ubah
            </LinkTo>
          </div>
        )}
        <h5>
          📅 {post.edited && <>Diubah</>} {publishedDate} • 📝
          <LinkTo href={`/${post.username}`}>{userDataPost.username}</LinkTo> •
          ⌛ {readTime} menit membaca
        </h5>

        <hr />
        <blockquote>
          <b>Latar belakang: </b> {post.background}
        </blockquote>
        <div>Tag: {Tag()}</div>
        <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} />
      </article>
    </div>
  );
}
