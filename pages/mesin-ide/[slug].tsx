import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { IdeaLayout } from "@modules/layouter";
import { PublishSidebar, CheckLogin, toast } from "@modules/composer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { UserContext } from "@modules/contexter";
import { msg, validator } from "@modules/validator";
import {
  auth,
  doc,
  db,
  deleteDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "@modules/firebaser";
import { useForm } from "react-hook-form";
import TextArea from "react-textarea-autosize";
import kebabCase from "lodash.kebabcase";
import { isValidTag } from "@modules/helper";

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

  let post = {
    title,
    background,
    content,
    tags,
  };

  const check = (expression, arg) => validator[expression](arg);

  // PublishIdea props
  const titleProps = {
    title,
    onchange(ev) {
      setTitle(ev.target.value);
    },
    style: "",
  };
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
  const sidebarProps = {
    preview: () => setPreview(!preview),
    submit: () => {},
  };

  return (
    <CheckLogin>
      <IdeaManager />
    </CheckLogin>
  );
}

function IdeaManager() {
  const router = useRouter();
  const { slug } = router.query;

  const postRef = doc(
    db,
    `users/${auth.currentUser.uid}/posts/`,
    slug.toString()
  );
  const [post] = useDocumentDataOnce(postRef);

  return (
    <>
      {post && (
        <PublishIdea
          initialPost={post}
          userData={{ username: post.username, uid: post.uid }}
        />
      )}
    </>
  );
}
