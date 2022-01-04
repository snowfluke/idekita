import { useRouter } from "next/router";
import { emoji as em } from "@modules/emojier";

export default function NotFound404({ msg = "Sepertinya halaman yang kamu tuju tidak tersedia", emoji = em.lelah }) {
  const router = useRouter();
  return (
    <div className="prose text-center mx-auto lg:my-20 my-10 pb-10">
      <p className="text-4xl">{emoji}</p>
      <h1 className="mb-10">{msg}</h1>
      <p className="btn-section" onClick={router.back}>
        #Kembali
      </p>
    </div>
  );
}
