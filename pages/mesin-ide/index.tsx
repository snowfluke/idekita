import { CheckLogin } from "@modules/composer";
import { useContext } from "react";
import { UserContext } from "@modules/contexter";
import { PublishIdea } from "@modules/composer";

export default function IdeaMachineCollection() {
  const { username, user } = useContext(UserContext);
  return (
    <CheckLogin>
      {user && (
        <PublishIdea
          userData={{ username, uid: user.uid, photoURL: user.photoURL }}
          initialPost={false}
        />
      )}
    </CheckLogin>
  );
}
