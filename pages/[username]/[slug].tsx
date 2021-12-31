import { IdeaContent } from "@modules/composer";
import { docToJSON, getUserWithUsername } from "@modules/helper";
import { db, doc, getDoc, collectionGroup, getDocs } from "@modules/firebase";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userData = await getUserWithUsername(username);

  let post;

  if (userData) {
    const postRef = doc(db, `users/${userData.uid}/posts`, slug);
    const postData = await getDoc(postRef);
    post = docToJSON(postData);
  }

  return {
    props: { post, userData },
    revalidate: 60 * 1000,
  };
}

export async function getStaticPaths({ params }) {
  const snapshot = await getDocs(collectionGroup(db, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function IdeaProfile({ post, userData }) {
  return <IdeaContent post={post} userData={userData} />;
}
