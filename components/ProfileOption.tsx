/** The option button in the profile page containing Back, Report and Print button */

import { useRouter } from "next/router";

export default function ProfileOption({ username }) {
  const router = useRouter();

  return (
    <div className="flex space-x-2 print:hidden justify-between md:justify-end mb-7 mt-5 md:mb-0">
      <button
        onClick={router.back}
        className="btn-fuchsia-reverse hover:scale-105 inline-block hover:-rotate-6"
      >
        {"<"}
      </button>
      <button
        onClick={() =>
          router.push(
            encodeURI(
              `https://mail.google.com/mail/?view=cm&fs=1&to=admidekita@gmail.com&su=iDekita - Laporan Pelanggaran Kebijakan&body=Selamat siang, Tim iDekita. Saya ingin melaporkan salah satu akun Idekiawan dengan nama pengguna #${username} ( https://idekita.id/${username}/ ) karena terbukti melakukan pelanggaran ...`
            )
          )
        }
        className="btn-fuchsia-reverse hover:scale-105 inline-block hover:-rotate-6"
      >
        #Laporkan
      </button>
      <button
        onClick={() => window.print()}
        className="btn-fuchsia hover:scale-105 inline-block hover:-rotate-6"
      >
        #Cetak
      </button>
    </div>
  );
}
