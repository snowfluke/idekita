import Image from "next/image";
import { formatDate } from "@modules/helper";

export default function UserInfo({ user, photoURL }) {
  return (
    <div className="grid xl:grid-cols-4 xl:gap-10 md:grid-cols-2 md:gap-5 grid-cols-1">
      <div className="flex justify-center md:col-span-2 xl:col-span-1">
        <Image
          src={photoURL}
          alt={user.displayName}
          width={400}
          className="rounded-full border-4 p-1 border-fuchsia-500 shadow-sm cursor-pointer"
          height={400}
        />
      </div>

      <div className="xl:col-span-3 md:col-span-2 xl:text-left grid content-center mt-7 xl:mt-0 text-center">
        <p className="mb-2 font-semibold text-gray-400">
          Sejak <span>{formatDate(user.dateJoined)}</span>
        </p>
        <p className="md:text-6xl text-4xl font-semibold mb-3">
          {user.displayName}
        </p>
        <p className="text-xl font-semibold">{user.bio}</p>
        <p className="text-xl text-fuchsia-500 font-semibold select-all">
          {user.email}
        </p>
      </div>
    </div>
  );
}
