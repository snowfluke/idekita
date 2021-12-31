import {
  GoogleAuthProvider,
  signInWithPopup,
  auth,
  db,
  query,
  where,
  limit,
  collection,
  doc,
  getDoc,
  getDocs,
} from "@modules/firebase";
import { toast } from "@modules/composer";

const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
    toast.error("Terjadi kesalahan, coba lagi");
  }
};

const signOut = () => {
  auth.signOut();
};

const getUserWithUsername = async (username) => {
  try {
    const queryUsers = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    );
    const userDoc = (await getDocs(queryUsers)).docs.map((doc) =>
      docToJSON(doc)
    )[0];
    return userDoc;
  } catch (error) {
    console.log(error);
  }
};

const docToJSON = (doc) => {
  const data = doc.data();
  const isPost = data.hasOwnProperty("dateCreated") ? true : false;
  return isPost
    ? {
        ...data,
        dateCreated: data?.dateCreated?.toMillis() || 0,
        dateUpdated: data?.dateUpdated?.toMillis() || 0,
      }
    : {
        ...data,
        dateJoined: data?.dateJoined.toMillis() || 0,
      };
};

const isValidUsername = (username) => {
  const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return regex.test(username);
};

const isUsernameAvailable = async (username) => {
  try {
    const ref = doc(db, "usernames", username);
    const snap = await getDoc(ref);

    return !snap.exists();
  } catch (error) {
    console.log(error);
    toast.error("Terjadi kesalahan, silakan coba kembali");
  }
};

const minutesToRead = (content) => {
  const wordCount = content.trim().split(/\s+/g).length;
  const minutes = (wordCount / 100 + 1).toFixed(0);
  return minutes;
};

const formatDate = (milis) =>
  new Intl.DateTimeFormat("id", {
    dateStyle: "long",
  }).format(milis);

export {
  signIn,
  signOut,
  docToJSON,
  getUserWithUsername,
  isValidUsername,
  minutesToRead,
  formatDate,
  isUsernameAvailable,
};
