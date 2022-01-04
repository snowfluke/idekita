/** A loyal footer components displayed on all the pages just like the navbar */

export default function Footer() {
  return (
    <>
      <hr className="shadow-top h-[3px] bg-white hidden md:block" />

      <footer className="mt-10 md:mt-4">
        <div className="flex-row md:flex justify-between">
          {/* <!-- about --> */}
          <div className="leading-6 tracking-wide text-center md:text-left">
            <span className="font-semibold">
              #2022 iDekita •{" "}
              <span className="print:block hidden">
                Jembatani ide dengan realisasi
              </span>
              <a
                href="https://github.com/snowfluke/idekita"
                className="underline hover:text-fuchsia-500 print:hidden"
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
          <div className="text-center md:mt-0 mt-10 print:hidden">
            <SocialMedia />
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

function SocialMedia() {
  const media = [
    {
      link: "#",
      name: "instagram",
      symbol: "ig",
    },
    {
      link: "#",
      name: "telegram",
      symbol: "tg",
    },
    {
      link: "#",
      name: "twitter",
      symbol: "tw",
    },
    {
      link: "#",
      name: "youtube",
      symbol: "yt",
    },
    {
      link: "#",
      name: "facebook",
      symbol: "fb",
    },
  ];

  return (
    <>
      {media.map((item) => (
        <a href={item.link} key={item.name} className="social-icon">
          {item.symbol}
        </a>
      ))}
    </>
  );
}
