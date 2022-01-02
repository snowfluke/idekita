import { useRouter } from "next/router";
import { docToJSON } from "@modules/helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, doc, onSnapshot } from "@modules/firebaser";
import { useEffect, useState } from "react";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let unsub;
    if (user) {
      const ref = doc(db, "users", user.uid);
      unsub = onSnapshot(ref, (doc) => {
        if (doc.data() === undefined) return router.push("/bergabung");

        setUsername(doc.data()?.username);
        setUserData(docToJSON(doc));
      });
      return unsub;
    }

    setUsername(null);
    return unsub;
  }, [user]);

  return { user, username, userData };
}
