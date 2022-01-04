import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CheckLogin } from "@modules/composer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc, db } from "@modules/firebaser";
import { useContext } from "react";
import { UserContext } from "@modules/contexter";
import NotFound404 from "@pages/404";
import { emoji } from "@modules/emojier";

// Dynamic Imports
const PublishIdea = dynamic(() => import("@components/PublishIdea"));

export default function IdeaMachine() {
  return (
    <CheckLogin>
      <IdeaManager />
    </CheckLogin>
  );
}

function IdeaManager() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { slug } = router.query;

  const postRef = user ? doc(db, `users/${user.uid}/posts/`, slug.toString()) : null;
  const [post] = useDocumentDataOnce(postRef);

  return (
    <>
      {post && (
        <PublishIdea
          initialPost={post}
          userData={{
            username: post.username,
            uid: post.uid,
            photoURL: post.photoURL,
          }}
        />
      )}

      {!post && <NotFound404 msg="Kamu tidak memiliki akses untuk ide ini" emoji={`${emoji.lelah}`} />}
    </>
  );
}
