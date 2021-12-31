import Head from "next/head";
import Link from "next/link";
import { LinkTo } from "@modules/composer";

export default function Home() {
  return (
    <>
      {/* <!-- Content --> */}
      <div className="flex-row md:flex justify-between items-center">
        {/* <!-- hero image --> */}
        <img src="hero.png" alt="iDekita" className="w-full md:w-[50%]" />

        {/* <!-- hero text --> */}
        <div className="md:text-right text-center mt-8 md:mt-0">
          <h2 className="text-4xl font-semibold">
            <span className="text-fuchsia-500 b-transition hover:scale-105 inline-block hover:-rotate-3">
              #Bagikan
            </span>{" "}
            dan{" "}
            <span className="text-fuchsia-500 b-transition hover:scale-105 inline-block hover:rotate-3">
              #Temukan
            </span>
            <span className="block">ide kreatifmu</span>
          </h2>
          <h3 className="text-lg py-8 lg:tracking-wider leading-6">
            <span>Tidak semua orang mempunyai ide</span>
            <span className="block ">dan tidak semua orang dapat</span>
            <span className="block ">mewujudkan idenya</span>
          </h3>
          <LinkTo
            href="/langit-ide"
            className="mt-0 md:mt-5 px-10 py-2 text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded b-transition hover:scale-105 inline-block hover:-rotate-6 "
          >
            #Eksplorasi
          </LinkTo>
        </div>
      </div>
    </>
  );
}
