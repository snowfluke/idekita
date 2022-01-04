/** PublishIdea Components used in /mesin-ide route */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IdeaLayout } from "@modules/layouter";
import { PublishSidebar, IdeaContent, toast } from "@modules/composer";
import { validator, msg } from "@modules/validator";
import {
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

/**
 * Reusable for toggling between edit post and preview post mode
 * @param param0 initial post and user data
 * @returns Publish idea components
 */
export default function PublishIdea({ initialPost, userData }) {
  const data = {
    background: "",
    cloud: 0,
    slug: "",
    content: "",
    uid: userData.uid,
    photoURL: userData.photoURL,
    report: 0,
    edited: false,
    tags: [],
    title: "",
    published: false,
    username: userData.username,
  };

  const [post, setPost] = useState(data);
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const slug = initialPost ? post.slug : encodeURI(kebabCase(post.title));

  /**
   * Check the input value
   * @param expression expression of the post( content, background ...)
   * @param arg the value of the expression
   * @returns true or false
   */
  const check = (expression, arg) => validator[expression](arg);

  /**
   * Publish Idea functions
   */
  const publishIdea = async () => {
    try {
      setPost({ ...post, tags: tags });

      if (!check("title", post.title)) return toast.error(msg["title"]);
      if (!check("background", post.background))
        return toast.error(msg["background"]);
      if (!check("tags", tags)) return toast.error(msg["tags"]);
      if (!check("content", post.content)) return toast.error(msg["content"]);

      const docRef = doc(db, `users/${userData.uid}/posts`, slug);
      if (initialPost) {
        await updateDoc(docRef, {
          title: post.title,
          content: post.content,
          tags: tags,
          background: post.background,
          dateUpdated: serverTimestamp(),
          edited: true,
        });
      }

      if (!initialPost) {
        await setDoc(docRef, {
          ...post,
          slug,
          tags: tags,
          dateCreated: serverTimestamp(),
          dateUpdated: serverTimestamp(),
        });
      }

      toast.success("Berhasil mempublikasikan ide 🎉");
      router.push(`/${userData.username}/${post.slug}`);
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, silakan coba kembali");
    }
  };

  /**
   * Delete idea functions
   */
  const deleteIdea = async () => {
    try {
      if (initialPost) {
        let confirmation = confirm("Apakah anda yakin?");
        if (!confirmation) return;

        const docRef = doc(db, `users/${userData.uid}/posts`, slug);
        await deleteDoc(docRef);
      }

      router.push("/langit-ide");
      toast.success("Berhasil membuang ide 😢");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, silakan coba kembali");
    }
  };

  /**
   * Render tags typed by user
   * @returns tag components
   */
  const renderTag = () =>
    tags.map((tag, id) => (
      <a key={tag + id} className="mr-2">
        #{tag}
      </a>
    ));

  /**
   * Reset the tag input after rendered
   * @param ev event
   */
  const resetTag = (ev) => {
    ev.preventDefault();
    setTagsInput("");
  };

  /**
   * List of all individuals props corresponding to the event name
   */
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

  /** Check the initial post, in case editing an idea */
  useEffect(() => {
    if (initialPost) {
      setTags(initialPost.tags);
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
                maxLength={100}
              />

              <div className="flex w-full">
                <TextArea
                  value={`https://idekita.id/${userData.username}/${slug}`}
                  className="underline cursor-pointer text-fuchsia-500 w-full resize-none"
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
                  maxLength={400}
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
                maxLength={10000}
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
              tags: tags,
            }}
            userDataPost={userData}
          />
        )
      }
      SidebarComponent={
        <PublishSidebar
          sidebar={{
            preview: () => setPreview(!preview),
            submit: () => publishIdea(),
            delete: () => deleteIdea(),
          }}
        />
      }
    />
  );
}
