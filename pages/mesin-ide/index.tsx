import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { IdeaLayout } from "@modules/layouter";
import { PublishSidebar, CheckLogin } from "@modules/composer";
import { UserContext } from "@modules/contexter";

// Dynamic Imports
const IdeaContent = dynamic(() => import("@components/IdeaContent"));
const PublishIdea = dynamic(() => import("@components/PublishIdea"));

export default function IdeaMachine() {
  const { username, userData } = useContext(UserContext);

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

  // PublishIdea props
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
    <CheckLogin>
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
            <PublishIdea
              heading={titleProps}
              tags={tagsProps}
              background={backgroundProps}
              content={contentProps}
              userData={userData}
            />
          }
          SidebarComponent={<PublishSidebar preview={previewProps} />}
        />
      )}
    </CheckLogin>
  );
}
