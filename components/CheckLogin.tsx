import { UserContext } from "@modules/contexter";
import { LinkTo } from "@modules/composer";
import { useContext } from "react";
import NotFound404 from "@pages/404";

export default function CheckLogin(props) {
  const { username } = useContext(UserContext);
  return username
    ? props.children
    : props.fallback || (
        <NotFound404
          msg="Kamu harus terdaftar sebagai Idekiawan terlebih dahulu"
          emoji="😓"
        />
      );
}
