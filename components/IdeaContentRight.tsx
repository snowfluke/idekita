import { CheckLogin, LinkTo } from "@modules/composer";
import { useDocument } from "react-firebase-hooks/firestore";
import { toast } from "@modules/composer";
import {
  db,
  doc,
  getDoc,
  collectionGroup,
  getDocs,
  writeBatch,
  increment,
} from "@modules/firebaser";
import { useContext, useState } from "react";
import { UserContext } from "@modules/contexter";

export default function IdeaContentRight({ TopElement, menu }) {
  const ideaMenu = () =>
    menu.map((menu) => {
      return menu.special ? (
        <CheckLogin
          fallback={
            <LinkTo href={"/bergabung"}>Bergabung dan beri dukungan</LinkTo>
          }
        >
          <Cloud post={menu.post} />
        </CheckLogin>
      ) : (
        <div key={menu.name} className={"btn-idea-right bg-white"}>
          <button
            onClick={menu.onclick}
            disabled={menu.disabled}
            className="p-5 flex active:bg-fuchsia-500 active:outline-none w-full !cursor-pointer rounded-br-full rounded-tr-full"
          >
            <div className="flex flex-grow text-lg font-bold text-fuchsia-500 active:text-white select-none">
              {menu.name}
            </div>
            <div className="flex-none w-8 text-center bg-gray-100 text-lg rounded-full p-[2px] prose justify-self-end select-none">
              {menu.icon}
            </div>
          </button>
        </div>
      );
    });

  return (
    <div className="space-y-2 rounded-md border sticky top-24 flex-col">
      {TopElement && <TopElement />}
      {ideaMenu()}
    </div>
  );
}

function Cloud({ post }) {
  const { userData } = useContext(UserContext);

  const cloudRef = doc(
    db,
    `users/${post.uid}/${post.slug}/clouds`,
    userData.uid
  );
  const postRef = doc(db, `users/${post.uid}`, post.slug);
  const [cloudDoc] = useDocument(cloudRef);

  const addCloud = async () => {
    try {
      const uid = userData.uid;
      const batch = writeBatch(db);

      batch.update(postRef, { cloud: increment(1) });
      batch.set(cloudRef, { uid });

      await batch.commit();
      toast.success("Berhasil memberikan dukungan 🥳");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, silakan coba kembali");
    }
  };

  return (
    <div key="#Dukung" className={"btn-idea-right bg-white"}>
      <button
        onClick={addCloud}
        disabled={cloudDoc?.exists()}
        className="p-5 flex active:bg-fuchsia-500 active:outline-none w-full !cursor-pointer rounded-br-full rounded-tr-full"
      >
        <div className="flex flex-grow text-lg font-bold text-fuchsia-500 active:text-white select-none">
          #Dukung
        </div>
        <div className="flex-none w-8 text-center bg-gray-100 text-lg rounded-full p-[2px] prose justify-self-end select-none">
          {"✊"}
        </div>
      </button>
    </div>
  );
}
