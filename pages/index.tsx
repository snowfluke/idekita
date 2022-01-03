
import { LinkTo } from "@modules/composer";
import { Meta } from "@modules/composer";

export default function Home() {
  return (
    <>
      <Meta title="iDekita 💡 Wadah Ide-ide Kreatif" description="Cari, temukan, dan publikasikan ide-ide kreatif bersama dengan Idekiawan di seluruh Indonesia" />
      {/* <!-- Content --> */}
      <div className="flex-row lg:flex justify-between items-center mt-4">
        {/* <!-- hero image --> */}
        <img src="hero.png" alt="iDekita" className="w-full lg:w-[50%]" />

        {/* <!-- hero text --> */}
        <div className="lg:text-right text-center my-8 lg:my-0">
          <h1 className="h1-style">
            <span className="text-h-rotate">#Bagikan</span> dan <span className="text-h-rotate">#Temukan</span>
            <span className="block">ide kreatifmu</span>
          </h1>
          <h4 className="text-lg py-8 lg:tracking-wider leading-6">
            <span>Tidak semua orang mempunyai ide</span>
            <span className="block">dan tidak semua orang dapat</span>
            <span className="block">mewujudkan idenya</span>
          </h4>
          <LinkTo href="/langit-ide" className="mt-0 md:mt-5 btn-fuchsia px-10 hover:scale-105 inline-block hover:-rotate-6 ">
            #Eksplorasi
          </LinkTo>
        </div>
      </div>
    </>
  );
}
