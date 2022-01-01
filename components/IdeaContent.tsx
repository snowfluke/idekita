import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkTo } from "@modules/composer";
import { formatDate, minutesToRead } from "@modules/helper";

export default function IdeaContent({ post, userData }) {
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
    <div className="bg-white rounded-md border border-gray-300 px-24 py-16">
      <article className="prose prose-a:text-fuchsia-500 prose-headings:text-fuchsia-500 lg:prose-lg mx-auto prose-a:underline prose-a:decoration-fuchsia-500">
        <h1 id="idea-header" className="scroll-mt-36">
          {post.title}
        </h1>
        <h5>
          📅 {publishedDate} • 📝
          <LinkTo href={`/${post.username}`}>{userData.displayName}</LinkTo> •
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
