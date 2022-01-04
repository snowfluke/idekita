import { UserContext } from "@modules/contexter";
import { useContext } from "react";
import NotFound404 from "@pages/404";
import { emoji } from "@modules/emojier";

export default function CheckLogin(props) {
  const { username } = useContext(UserContext);
  return username ? props.children : props.fallback || <NotFound404 msg="Kamu harus terdaftar sebagai Idekiawan terlebih dahulu" emoji={emoji.sedih} />;
}
