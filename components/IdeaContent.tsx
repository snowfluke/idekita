import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkTo } from "@modules/composer";
import { formatDate, minutesToRead } from "@modules/helper";
import { useRouter } from "next/router";
import { useState } from "react";

export default function IdeaContent({ post, userData }) {
  const publishedDate = formatDate(post.dateUpdated);
  const readTime = minutesToRead(post.content);
  const router = useRouter();

  const [cloud, setCloud] = useState(0);

  return (
    <div className="flex my-5 relative">
      <div className="flex-auto w-[70%] bg-white rounded-md border border-gray-300 px-8 py-16">
        <article className="prose prose-a:text-fuchsia-500 prose-headings:text-fuchsia-500 lg:prose-lg mx-auto prose-a:underline prose-a:decoration-fuchsia-500">
          <h1 id={post.slug} className="scroll-mt-24">
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
          <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} />
        </article>
      </div>

      <div className="flex-auto h-[100%] sticky top-24 space-y-2 rounded-md border flex flex-col">
        <div className="flex-1 font-bold text-3xl  p-5 rounded-md content-center">
          <div className="active:-translate-y-2 duration-300 transition">
            ☁ {cloud}
          </div>
        </div>
        <div className="flex-1 cursor-pointer rounded-tr-full border-l-4 hover:translate-x-10 transition border-dashed border-fuchsia-500 rounded-br-full   bg-white rounded-md content-center">
          <div
            onClick={() => setCloud(cloud + 1)}
            className="p-5 flex text-lg font-bold text-fuchsia-500"
          >
            #Dukung
          </div>
        </div>
        <div className="flex-1 cursor-pointer rounded-tr-full border-l-4 hover:translate-x-10 transition border-dashed border-fuchsia-500 rounded-br-full bg-white rounded-md content-center">
          <a
            href={`#${post.slug}`}
            className="p-5 flex text-lg font-bold text-fuchsia-500"
          >
            #Bagikan
          </a>
        </div>
        <div className="flex-1 cursor-pointer rounded-tr-full border-l-4 hover:translate-x-10 transition border-dashed border-fuchsia-500 rounded-br-full bg-white rounded-md content-center">
          <div
            onClick={() =>
              router.push(
                encodeURI(
                  `https://mail.google.com/mail/?view=cm&fs=1&to=${userData.email}&su=iDekita - ${post.title}&body=Hai, ${userData.displayName} 👋! Sehubungan dengan ide yang Anda publikasi di tautan https://idekita.id/${post.username}/${post.slug}. Saya bermaksud untuk berdiskusi lebih jauh mengenai hal itu. `
                )
              )
            }
            className="p-5 flex text-lg font-bold text-fuchsia-500"
          >
            #Kirim Email
          </div>
        </div>
        <div className="flex-1 cursor-pointer rounded-tr-full border-l-4 hover:translate-x-10 transition border-dashed border-fuchsia-500 rounded-br-full bg-white rounded-md content-center">
          <div
            onClick={() => router.back()}
            className="p-5 flex text-lg font-bold text-fuchsia-500"
          >
            #Kembali
          </div>
        </div>
      </div>
    </div>
  );
}
