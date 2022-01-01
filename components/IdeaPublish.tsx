export default function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-white rounded-md border border-gray-300 px-8 py-16">
      <article className="prose prose-a:text-fuchsia-500 prose-headings:text-fuchsia-500 lg:prose-lg mx-auto prose-a:underline prose-a:decoration-fuchsia-500">
        <h1 id="idea-header" className="scroll-mt-36"></h1>

        <hr />
        <blockquote>
          <b>Latar belakang: </b>
        </blockquote>
        <div>Tag: {}</div>
      </article>
    </div>
  );
}
