import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IdeaLayout } from "@modules/layouter";
import { PublishSidebar, IdeaContent, toast } from "@modules/composer";
import { UserContext } from "@modules/contexter";
import {
  auth,
  doc,
  db,
  deleteDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "@modules/firebaser";
import TextArea from "react-textarea-autosize";
import kebabCase from "lodash.kebabcase";
import { isValidTag } from "@modules/helper";

export default function PublishIdea({ initialPost, userData }) {
  const data = {
    background: "",
    cloud: 0,
    slug: "",
    content: "",
    uid: "",
    report: 0,
    tags: [],
    title: "",
    published: false,
    username: userData.username,
  };

  const [post, setPost] = useState(data);
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [preview, setPreview] = useState(false);
  const slug = initialPost ? post.slug : encodeURI(kebabCase(post.title));

  // const publishIdea = async ({ content, background, tags }) => {
  //   return console.log({ content, background, title, tags });
  //   await updateDoc(docRef, {
  //     content,
  //     background,
  //     title,
  //     tags,
  //     published: true,
  //     dateUpdated: serverTimestamp(),
  //   });

  //   toast.success("Berhasil mempublikasi ide 🎉");
  // };

  const renderTag = () =>
    post.tags.map((tag, id) => (
      <a key={tag + id} className="mr-2">
        #{tag}
      </a>
    ));

  const resetTag = (ev) => {
    ev.preventDefault();
    setTagsInput("");
  };

  const tagsProps = {
    onchange: (ev) => setTagsInput(ev.target.value),
    onkeydown: (ev) => {
      const { key } = ev;
      const trimmed = tagsInput.trim().toLowerCase();

      if (key === ",") {
        if (tags.includes(trimmed)) return resetTag(ev);
        if (!isValidTag(trimmed) || tags.length > 3) return resetTag(ev);

        setTags((prevTags) => [...prevTags, trimmed]);
        return resetTag(ev);
      }

      if (key === "Backspace" && tags.length && tagsInput.length === 0) {
        ev.preventDefault();
        let copiedTags = [...tags];
        let leftoverTag = copiedTags.pop();
        setTags(copiedTags);
        setTagsInput(leftoverTag);
      }
    },
  };

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
      return;
    }

    return;
  }, [initialPost]);

  return (
    <IdeaLayout
      MainComponent={
        !preview ? (
          <div className="article-wrapper">
            <article className="article-prose">
              <TextArea
                spellCheck={false}
                value={post.title}
                onChange={(ev) => setPost({ ...post, title: ev.target.value })}
                name="title"
                className="txt-area scroll-mt-36 text-4xl font-bold"
                placeholder="Judul ide brilianmu"
              />

              <div className="flex w-full">
                <TextArea
                  value={`https://idekita.id/${userData.username}/${slug}`}
                  className="underline cursor-pointer text-fuchsia-500 w-full"
                  disabled
                />
              </div>

              <hr />

              <blockquote>
                <TextArea
                  name="background"
                  value={post.background}
                  onChange={(ev) =>
                    setPost({ ...post, background: ev.target.value })
                  }
                  className="txt-area italic"
                  spellCheck={false}
                  minRows={2}
                  placeholder="Latar belakang: Ceritakan bagaimana idemu bisa terlahir dan buat orang lain terinspirasi"
                />
              </blockquote>

              <div className="w-full flex">
                {renderTag()}
                <input
                  spellCheck={false}
                  value={tagsInput}
                  className="txt-area form-control outline-none border-none w-full"
                  placeholder={
                    tags.length < 4
                      ? "Berikan tag idemu dan pisahkan dengan koma"
                      : ""
                  }
                  onKeyDown={tagsProps.onkeydown}
                  onChange={tagsProps.onchange}
                />
              </div>

              <TextArea
                name="content"
                onChange={(ev) =>
                  setPost({ ...post, content: ev.target.value })
                }
                className="txt-area mt-5"
                value={post.content}
                spellCheck={false}
                placeholder="Tuliskan '# Halo iDekita' dan mulai dari sekarang sebelum idemu pergi"
              />
            </article>
          </div>
        ) : (
          <IdeaContent
            post={{
              dateCreated: Date.now(),
              dateUpdated: Date.now(),
              ...post,
            }}
            userData={userData}
          />
        )
      }
      SidebarComponent={
        <PublishSidebar
          sidebar={{
            preview: () => setPreview(!preview),
          }}
        />
      }
    />
  );
}
