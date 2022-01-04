/** This files is used to store all the custom helper functions available */

/** Import all the necessary modules */
import {
  GoogleAuthProvider,
  signInWithRedirect,
  auth,
  db,
  query,
  where,
  limit,
  collection,
  doc,
  getDoc,
  getDocs,
} from "@modules/firebaser";
import { toast } from "@modules/composer";

/**
 * Function to Sign In using Google account with Redirect method
 */
const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const log = await signInWithRedirect(auth, provider);
  } catch (error) {
    toast.error("Autentikasi dibatalkan");
  }
};

/**
 * Function to Sign Out from currently active user account
 */
const signOut = () => {
  auth.signOut();
};

/**
 * Function to get user details using the given username and the results already serialized
 * @param username username from the account that the user details wants to get retrieved
 * @returns Object of the user details, null if not found
 */
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
    return userDoc || null;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Convert a DocumentSnapshot into a JSON, because the problems of Firestore Document is that the Timestamp is not going to be a milisecons
 * @param doc DocumentSnapshot that is want to serialize as a JSON
 * @returns JSON of the Document snap
 */
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
        dateJoined: data?.dateJoined?.toMillis() || 0,
      };
};

/**
 * Check username using regex validation, alphabet and between 3-15 characters long
 * @param username username to check
 * @returns boolean of the test result
 */
const isValidUsername = (username) => {
  const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return regex.test(username);
};

/**
 * Check tag (3-12 characters) same as isValidUsername function
 * @param tag individual tag, string
 * @returns boolean result
 */
const isValidTag = (tag) => {
  const regex = /^(?=[a-zA-Z._]{3,12}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return regex.test(tag);
};

/**
 * Function to check the username when debouncing
 * @param username username to check the availability, string
 * @returns true if available
 */
const isUsernameAvailable = async (username: string) => {
  try {
    const ref = doc(db, "usernames", username);
    const snap = await getDoc(ref);

    return !snap.exists();
  } catch (error) {
    console.log(error);
    toast.error("Terjadi kesalahan, silakan coba kembali");
  }
};

/**
 * Calculate the amount of time to read using Naive Method
 * @param content The text content
 * @returns minutes
 */
const minutesToRead = (content) => {
  const wordCount = content.trim().split(/\s+/g).length;
  const minutes = (wordCount / 100 + 1).toFixed(0);
  return minutes;
};

/**
 * Convert miliseconds to Indonesian date time format
 * @param milis miliseconds of the date
 * @returns string formatted date
 */
const formatDate = (milis) =>
  new Intl.DateTimeFormat("id", {
    dateStyle: "long",
  }).format(milis);

/** Export all the necessary modules */
export {
  signIn,
  signOut,
  docToJSON,
  getUserWithUsername,
  isValidUsername,
  minutesToRead,
  formatDate,
  isUsernameAvailable,
  isValidTag,
};
