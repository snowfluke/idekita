/** Reusable and composable meta tags for SEO */

import Head from "next/head";
import { emoji } from "@modules/emojier";

export default function MetaTags({
  title = `iDekita ${emoji.jembatan} Jembatani ide dengan realisasi`,
  description = "Sebuah situs web sebagai wadah penyaluran ide dan pencarian ide baik bagi pencetus ide maupun pencari ide untuk merealisasikannya.",
  image = "/public/favicon-96x96.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        name="google-site-verification"
        content="0pnDGQ5kl7Ebp0jOPr8vYT5jEokNnjpiuL7XWG6LUQY"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@idekita" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
