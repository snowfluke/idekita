export default function Footer() {
  return (
    <>
      <hr className="shadow-top h-[3px] bg-white hidden md:block" />

      <footer className="mt-10 md:mt-4">
        <div className="md:flex flex-row justify-between">
          {/* <!-- about --> */}
          <div className="leading-6 tracking-wide text-center md:text-left">
            <span className="font-semibold">
              #2022 iDekita -{" "}
              <a
                href="https://github.com/snowfluke/idekita"
                className="underline"
              >
                Repositori GitHub
              </a>
            </span>
            <span className="block mt-3 md:mt-0">
              Jl. Dr. Wahidin RT 003/003 Sindangsari, Majenang, Jawa Tengah
              53257
            </span>
            <span className="block">admidekita@gmail.com</span>
          </div>

          {/* <!-- social media --> */}
          <div className="text-center md:mt-0 mt-10">
            <a href="#" className="social-icon hover:bg-fuchsia-600">
              ig
            </a>
            <a href="#" className="social-icon hover:bg-fuchsia-600">
              tg
            </a>
            <a href="#" className="social-icon hover:bg-fuchsia-600">
              yt
            </a>
            <a href="#" className="social-icon hover:bg-fuchsia-600">
              tw
            </a>
            <a href="#" className="social-icon hover:bg-fuchsia-600">
              fb
            </a>
          </div>
        </div>

        {/* <!-- footer text --> */}
        <div className="flex justify-center my-8 text-4xl font-semibold">
          <h2 className="text-center">
            <span className="text-fuchsia-500 b-transition hover:scale-105 inline-block hover:-rotate-3 ">
              #Terbangkan
            </span>{" "}
            idemu di awan
          </h2>
        </div>
      </footer>
    </>
  );
}
