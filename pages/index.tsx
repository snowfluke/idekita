/** Root, landing page route */

import Image from "next/image";
import { LinkTo } from "@modules/composer";
import { Meta } from "@modules/composer";
import { emoji } from "@modules/emojier";

export default function Home() {
  return (
    <>
      <Meta
        title={`iDekita ${emoji.lampu} Wadah Ide-ide Kreatif`}
        description="Cari, temukan, dan publikasikan ide-ide kreatif bersama dengan Idekiawan di seluruh Indonesia"
      />
      {/* <!-- Content --> */}
      <div className="flex-row lg:flex justify-between items-center">
        {/* <!-- hero image --> */}
        <Image
          src={"/hero.png"}
          alt={"iDekita Hero Logo"}
          width={500}
          height={400}
        />

        {/* <!-- hero text --> */}
        <div className="lg:text-right text-center my-8 lg:my-0">
          <h1 className="h1-style">
            <span className="text-h-rotate ">#Bagikan</span> dan{" "}
            <span className="text-h-rotate ">#Temukan</span>
            <span className="block">ide kreatifmu</span>
          </h1>
          <h4 className="text-lg py-8 lg:tracking-wider leading-6">
            <span>Tidak semua orang mempunyai ide</span>
            <span className="block">dan tidak semua orang dapat</span>
            <span className="block">mewujudkan idenya</span>
          </h4>
          <LinkTo
            href="/langit-ide"
            className="mt-0 md:mt-5 btn-fuchsia px-10 hover:scale-105 inline-block hover:-rotate-6 "
          >
            #Eksplorasi
          </LinkTo>
        </div>
      </div>
    </>
  );
}
