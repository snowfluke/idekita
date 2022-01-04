/** This files is used to store all the custom hooks available */

import { useRouter } from "next/router";
import { docToJSON } from "@modules/helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, doc, onSnapshot } from "@modules/firebaser";
import { useEffect, useState } from "react";

/**
 * Custom hooks to wrap the whole application so that can easily transfer state
 * @returns Object of user, username, userdata, modal controllers and modal default state
 */
export function useUserData() {
  /**
   * Default state
   */
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const [modalData, setModalData] = useState({
    show: false,
    content: "",
    title: "",
  });

  /**
   * Modal controllers
   */
  const openModal = ({ title, content }) =>
    setModalData({ title, content, show: true });
  const closeModal = () =>
    setModalData({ title: "", content: "", show: false });

  /** Fire when the auth state changes and grab the newest data */
  useEffect(() => {
    let unsub;
    if (user) {
      const ref = doc(db, "users", user.uid);
      unsub = onSnapshot(ref, (doc) => {
        if (doc.data() === undefined) return router.push("/bergabung");

        setUsername(doc.data()?.username);
        setUserData(docToJSON(doc));
      });
    } else {
      setUsername(null);
    }

    return unsub;
  }, [user]);

  return {
    user,
    username,
    userData,
    modalData: modalData,
    modal: { openModal, closeModal },
  };
}
