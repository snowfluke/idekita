export default function Footer() {
  return (
    <>
      <hr className="shadow-top h-[3px] bg-white hidden md:block" />

      <footer className="mt-10 md:mt-4">
        <div className="flex-row md:flex justify-between">
          {/* <!-- about --> */}
          <div className="leading-6 tracking-wide text-center md:text-left">
            <span className="font-semibold">
              #2022 iDekita -{" "}
              <a href="https://github.com/snowfluke/idekita" className="underline hover:text-fuchsia-500">
                Repositori GitHub
              </a>
            </span>
            <span className="block mt-3 md:mt-0">Jl. Dr. Wahidin RT 003/003 Sindangsari, Majenang, Jawa Tengah 53257</span>
            <span className="block">admidekita@gmail.com</span>
          </div>

          {/* <!-- social media --> */}
          <div className="text-center md:mt-0 mt-10">
            <a href="#" className="social-icon">
              ig
            </a>
            <a href="#" className="social-icon">
              tg
            </a>
            <a href="#" className="social-icon">
              yt
            </a>
            <a href="#" className="social-icon">
              tw
            </a>
            <a href="#" className="social-icon">
              fb
            </a>
          </div>
        </div>

        {/* <!-- footer text --> */}
        <div className="flex justify-center my-8">
          <h2 className="text-center text-4xl font-semibold">
            <span className="text-h-rotate">#Terbangkan</span> idemu di awan
          </h2>
        </div>
      </footer>
    </>
  );
}
