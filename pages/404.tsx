import { useRouter } from "next/router";

export default function NotFound404({
  msg = "Sepertinya halaman yang kamu tuju tidak tersedia",
  emoji = "🤷‍♂️",
}) {
  const router = useRouter();
  return (
    <div className="prose text-center mx-auto my-10">
      <h1>{msg}</h1>
      <p className="text-4xl">{emoji}</p>
      <p
        className="text-lg text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded-md py-2 b-transition cursor-pointer"
        onClick={router.back}
      >
        #Kembali
      </p>
    </div>
  );
}
