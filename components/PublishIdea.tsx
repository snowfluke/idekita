import { useEffect, useState } from "react";
import { isValidTag } from "@modules/helper";
import { TextArea } from "@modules/composer";
import kebabCase from "lodash.kebabcase";

export default function PublishIdea(props) {
  const [tags, setTags] = useState([]);
  const [tagsInputChild, setTagsInputChild] = useState("");
  const slug = encodeURI(kebabCase(props.heading.title));

  const resetTag = (ev) => {
    ev.preventDefault();
    setTagsInputChild("");
  };
  const tagsProps = {
    onchange: (ev) => setTagsInputChild(ev.target.value),
    onkeyup: () => {
      props.tags.update([...tags]);
    },
    onkeydown: (ev) => {
      const { key } = ev;
      const trimmed = tagsInputChild.trim().toLowerCase();

      if (key === ",") {
        if (tags.includes(trimmed)) return resetTag(ev);
        if (!isValidTag(trimmed) || tags.length > 3) return resetTag(ev);

        setTags((prevTags) => [...prevTags, trimmed]);
        return resetTag(ev);
      }

      if (key === "Backspace" && tags.length && tagsInputChild.length === 0) {
        ev.preventDefault();
        let copiedTags = [...tags];
        let leftoverTag = copiedTags.pop();
        setTags(copiedTags);
        setTagsInputChild(leftoverTag);
      }
    },
  };

  useEffect(() => {
    setTags(props.tags.tags);
  }, [props]);

  const renderTag = () =>
    tags.map((tag, id) => (
      <a key={tag + id} className="mr-2">
        #{tag}
      </a>
    ));

  return (
    <div className="bg-white rounded-md border border-gray-300 px-24 py-16">
      <article className="prose prose-a:text-fuchsia-500 prose-headings:text-fuchsia-500 lg:prose-lg mx-auto prose-a:underline prose-a:decoration-fuchsia-500">
        <TextArea
          id="idea-header"
          value={props.heading.title}
          onChange={props.heading.onchange}
          className="scroll-mt-36 text-4xl font-bold"
          placeholder="Judul ide brilianmu"
        />

        <div>
          <a href={`https://idekita.id/${props.userData.username}/${slug}`}>
            <TextArea
              id="idea-slug"
              value={`https://idekita.id/${props.userData.username}/${slug}`}
              className="underline cursor-pointer text-fuchsia-500"
              disabled
            />
          </a>
        </div>

        <hr />

        <blockquote>
          <TextArea
            id="idea-background"
            value={props.background.background}
            className="italic"
            onChange={props.background.update}
            placeholder="Latar belakang: Ceritakan bagaimana idemu bisa terlahir dan buat orang lain terinspirasi"
          />
        </blockquote>

        <div className="w-full flex">
          {renderTag()}
          <input
            spellCheck={false}
            value={tagsInputChild}
            className="form-control outline-none border-none w-full"
            placeholder="Berikan tag idemu dan pisahkan dengan koma"
            onKeyDown={tagsProps.onkeydown}
            onKeyUp={tagsProps.onkeyup}
            onChange={tagsProps.onchange}
          />
        </div>

        <TextArea
          id="idea-background"
          value={props.content.content}
          onChange={props.content.update}
          placeholder="Tuliskan '# Halo iDekita' dan mulai dari sekarang sebelum idemu pergi"
        />
      </article>
    </div>
  );
}
