import { useRouter } from "next/router";

export default function notFound404() {
  const router = useRouter();
  return (
    <div className="prose text-center mx-auto my-10">
      <h1>Sepertinya halaman yang kamu tuju tidak tersedia</h1>
      <p className="text-4xl">🤷‍♂️</p>
      <p
        className="text-lg text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded-md py-2 b-transition cursor-pointer"
        onClick={router.back}
      >
        #Kembali
      </p>
    </div>
  );
}
