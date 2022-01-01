import dynamic from "next/dynamic";
import TextareaAutosize from "react-textarea-autosize";
import kebabCase from "lodash.kebabcase";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, IdeaContentRight } from "@modules/composer";
import { IdeaLayout } from "@modules/layouter";
import { formatDate, isValidTag } from "@modules/helper";
import { UserContext } from "@modules/contexter";

const IdeaContent = dynamic(() => import("@components/IdeaContent"));

export default function IdeaMachine() {
  const { user, username, userData } = useContext(UserContext);

  const router = useRouter();
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const isValid = title.length > 10 && title.length < 100;

  const publishIdea = async (event) => {
    event.preventDefault();
    // const uid = auth.currentUser.uid;
    // const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    // // Tip: give all fields a default value here
    // const data = {

    // };

    // await ref.set(data);

    // toast

    // Imperative navigation after doc is set
    // router.push(`/admin/${slug}`);
  };

  const titleProps = { title, onchange: (ev) => setTitle(ev.target.value) };
  const tagsProps = {
    tags,
    update: (tagsFromChild) => setTags(tagsFromChild),
  };
  const backgroundProps = {
    background,
    update: (ev) => setBackground(ev.target.value),
  };
  const contentProps = {
    content,
    update: (ev) => setContent(ev.target.value),
  };
  const previewProps = {
    onclick: () => setPreview(!preview),
  };

  return (
    <>
      {preview && (
        <IdeaLayout
          MainComponent={
            <IdeaContent
              post={{
                background,
                cloud: 0,
                content,
                dateCreated: Date.now(),
                dateUpdated: Date.now(),
                report: 0,
                tags,
                title,
                username,
              }}
              userData={userData}
            />
          }
          SidebarComponent={<PublishSidebar preview={previewProps} />}
        />
      )}
      {!preview && (
        <IdeaLayout
          MainComponent={
            <PublishIdeaComponent
              heading={titleProps}
              tags={tagsProps}
              background={backgroundProps}
              content={contentProps}
            />
          }
          SidebarComponent={<PublishSidebar preview={previewProps} />}
        />
      )}
    </>
  );
}

// const B = () => {
//   return (
//     <>
//     <div className="grid grid-cols-5 my-5">
//       <div className="lg:col-span-3 col-span-5 mr-0 lg:mr-5 p-5 bg-fuchsia-700 text-white rounded-md">
//         <h2 className="text-4xl font-bold text-white text-center mb-10 border-b pb-4">
//           Mesin Pembuat Ide 🚀
//         </h2>

//         <div className="my-4">
//           <label className="form-label inline-block mt-2 ml-2 text-lg">
//             Tautan: <span className="font-semibold">{slug}</span>
//           </label>
//           <TextareaAutosize
//             value={title}
//             spellCheck={false}
//             onChange={(e) => setTitle(e.target.value)}
//             className="form-control block w-full px-2 py-4 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-4xl font-bold focus:outline-none overflow-hidden resize-none"
//             id="judul"
//             minRows={1}
//             placeholder="Judul ide brilianmu"
//           />
//         </div>

//         <div className="mb-4">
//           <textarea
//             className="form-control block w-full px-2 py-3 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-lg font-bold focus:outline-none overflow-hidden resize-none"
//             id="latar"
//             rows={1}
//             placeholder="Latar belakang idemu (<300 karakter)"
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <textarea
//             className="form-control block w-full px-2 py-3 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-lg font-bold focus:outline-none overflow-hidden resize-none"
//             id="isi"
//             rows={1}
//             placeholder="Isi penjelasan idemu (< 3000 karakter)"
//           ></textarea>
//         </div>

//         <div className="my-4">
//           <textarea
//             className="form-control block w-full px-2 py-3 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-lg font-bold focus:outline-none overflow-hidden resize-none"
//             id="tag"
//             rows={1}
//             placeholder="Tag idemu dan pisahkan dengan koma (1 - 4 tag)"
//           ></textarea>
//         </div>

//         <h2 className="text-4xl font-bold text-white text-center mt-10 border-t py-4">
//           Pratinjau
//         </h2>
//         <div>
//           <p>Coba kamu ketikkan sesuatu pada mesin pembuat ide di atas</p>
//         </div>
//         <div className="my-4"></div>
//       </div>

//       <div className="lg:col-span-2 col-span-5 relative lg:mt-0 mt-5">
//         <div className="flex-row space-y-3 sticky top-20">
//           <button
//             type="button"
//             className="px-6 py-3 w-full border border-fuchsia-500 text-fuchsia-500 rounded shadow hover:bg-fuchsia-500 hover:shadow-md hover:text-white focus:outline-none focus:ring-0 b-transition font-semibold break-words"
//           >
//             Publikasikan
//           </button>
//           <button
//             type="button"
//             className="px-6 py-3 w-full bg-red-500 text-white rounded shadow hover:bg-red-600 hover:shadow-md focus:outline-none focus:ring-0 b- font-semibold break-words"
//           >
//             Hapus
//           </button>
//           <details className="mt-4 bg-white rounded-md">
//             <summary className="font-semibold bg-fuchsia-500 text-white rounded py-3 px-6">
//               Panduan
//             </summary>
//             <div className="grid grid-cols-5 p-4 break-words">
//               <div className="col-span-3">
//                 <div># Header</div>
//                 <div>. . .</div>
//                 <div>###### Header</div>
//                 <div className="mt-4">*italics* or _italics_</div>
//                 <div className="mt-4">**bold**</div>
//                 <div className="mt-4">[Link](https://...)</div>
//                 <div className="mt-4">* item 1</div>
//                 <div>* item 2</div>
//                 <div className="mt-4">1. item 1</div>
//                 <div>2. item 2</div>
//                 <div className="mt-4">{">"} quoted text</div>
//                 <div className="mt-4">`inline code`</div>
//                 <div className="mt-4">
//                   <p>```</p>
//                   <p>code block</p>
//                   <p>```</p>
//                 </div>
//               </div>

//               <div className="col-span-2">
//                 <div>H1 Header</div>
//                 <div>. . .</div>
//                 <div>H6 Header</div>
//                 <div className="mt-4">
//                   <i>italics</i>
//                 </div>
//                 <div className="mt-4">
//                   <b>bold</b>
//                 </div>
//                 <div className="mt-4">
//                   <a href="#" className="text-blue-600">
//                     Link
//                   </a>
//                 </div>
//                 <div className="mt-4">item 1</div>
//                 <div>item 2</div>
//                 <div className="mt-4">item 1</div>
//                 <div>item 2</div>
//                 <div className="border-l-[3px] border-gray-400 pl-2 mt-4">
//                   quoted text
//                 </div>
//                 <div className="mt-4">
//                   <small>inline code</small>
//                 </div>
//                 <div className="py-5 pl-4 bg-gray-300 mt-3">
//                   <code>code block</code>
//                 </div>
//               </div>
//             </div>
//           </details>
//         </div>
//       </div>
//     </div>
//   </>
//   )
// }
const PublishIdeaComponent = (props) => {
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
        <TextareaAutosize
          id="idea-header"
          value={props.heading.title}
          spellCheck={false}
          onChange={props.heading.onchange}
          className="scroll-mt-36 form-control block w-full bg-clip-padding rounded b-transition border-none text-4xl font-bold focus:outline-none overflow-hidden resize-none"
          minRows={1}
          placeholder="Judul ide brilianmu"
        />
        <div>
          Tautan: <span className="font-semibold">{slug}</span>
        </div>
        <hr />
        <blockquote>
          <TextareaAutosize
            id="idea-background"
            value={props.background.background}
            className="italic form-control block w-full bg-clip-padding rounded b-transition border-none focus:outline-none overflow-hidden resize-none"
            spellCheck={false}
            onChange={props.background.update}
            minRows={1}
            placeholder="Latar belakang:"
          />
        </blockquote>
        <div className="w-full flex">
          {renderTag()}
          <input
            spellCheck={false}
            value={tagsInputChild}
            className="form-control outline-none border-none w-full"
            placeholder="Tambahkan tag dengan pemisah koma"
            onKeyDown={tagsProps.onkeydown}
            onKeyUp={tagsProps.onkeyup}
            onChange={tagsProps.onchange}
          />
        </div>
        <TextareaAutosize
          id="idea-background"
          value={props.content.content}
          className="form-control block w-full bg-clip-padding rounded b-transition border-none focus:outline-none overflow-hidden resize-none"
          spellCheck={false}
          onChange={props.content.update}
          minRows={1}
          placeholder="Tuangkan idemu dengan sepenuhnya, mulai dengan mengetik # Halo Dunia"
        />
      </article>
    </div>
  );
};

const PublishSidebar = (props) => {
  const menu = [
    {
      name: "#Publikasi",
      icon: "🚀",
      onclick: () => {
        toast.success("Pesan berhasil di publikasi! 🎉");
      },
    },
    {
      name: "#Pratinjau",
      icon: "👀",
      onclick: props.preview.onclick,
    },
    { name: "#Bantuan", icon: "🙋‍♂️", onclick: () => {} },
    { name: "#Buang", icon: "😢", onclick: () => {} },
  ];

  return <IdeaContentRight TopElement={false} menu={menu} />;
};
