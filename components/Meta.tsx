import Head from "next/head";

export default function MetaTags({
  title = "iDekita 🌉 Jembatani ide dengan realisasi",
  description = "Sebuah situs web sebagai wadah penyaluran ide dan pencarian ide baik bagi pencetus ide maupun pencari ide untuk merealisasikannya.",
  image = "/public/favicon-96x96.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@idekita" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
