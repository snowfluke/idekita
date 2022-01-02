import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CheckLogin } from "@modules/composer";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { auth, doc, db } from "@modules/firebaser";

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
