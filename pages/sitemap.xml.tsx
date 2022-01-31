import {
  getDocs,
  orderBy,
  limit,
  collection,
  collectionGroup,
  db,
  query,
} from "@modules/firebaser";
import { docToJSON } from "@modules/helper";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseURL = "https://idekita.herokuapp.com/";
  const postsQuery = query(
    collectionGroup(db, "posts"),
    orderBy("dateUpdated", "desc"),
    limit(10000)
  );
  const postsFetched = (await getDocs(postsQuery)).docs.map(docToJSON);
  const posts = postsFetched.map(
    (post) => `
    <url>
      <loc> ${baseURL}${post.username}/${post.slug} </loc>
      <lastmod>${new Date(Date.now())}</lastmod>
      <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseURL}/</loc>
    <lastmod>${new Date(Date.now())}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseURL}/langit-ide</loc>
    <lastmod>${new Date(Date.now())}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseURL}/mesin-ide</loc>
    <lastmod>${new Date(Date.now())}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseURL}/snowfluke</loc>
    <lastmod>${new Date(Date.now())}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseURL}/404</loc>
    <lastmod>${new Date(Date.now())}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts.join(" ")}
</urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
