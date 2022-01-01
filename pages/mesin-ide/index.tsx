import TextareaAutosize from "react-textarea-autosize";
import kebabCase from "lodash.kebabcase";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "@modules/composer";

export default function IdeaMachine() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 10 && title.length < 100;

  const publishIdea = async (event) => {
    event.preventDefault();
    // const uid = auth.currentUser.uid;
    // const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    // // Tip: give all fields a default value here
    // const data = {

    // };

    // await ref.set(data);

    // toast

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <>
      <div className="grid grid-cols-5 my-5">
        <div className="lg:col-span-3 col-span-5 mr-0 lg:mr-5 p-5 bg-fuchsia-700 text-white rounded-md">
          <h2 className="text-4xl font-bold text-white text-center mb-10 border-b pb-4">
            Mesin Pembuat Ide 🚀
          </h2>

          <div className="my-4">
            <label className="form-label inline-block mt-2 ml-2 text-lg">
              Tautan: <span className="font-semibold">{slug}</span>
            </label>
            <TextareaAutosize
              value={title}
              spellCheck={false}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control block w-full px-2 py-4 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-4xl font-bold focus:outline-none overflow-hidden resize-none"
              id="judul"
              minRows={1}
              placeholder="Judul ide brilianmu"
            />
          </div>

          <div className="mb-4">
            <textarea
              className="form-control block w-full px-2 py-3 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-lg font-bold focus:outline-none overflow-hidden resize-none"
              id="latar"
              rows={1}
              placeholder="Latar belakang idemu (<300 karakter)"
            ></textarea>
          </div>

          <div className="mb-4">
            <textarea
              className="form-control block w-full px-2 py-3 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-lg font-bold focus:outline-none overflow-hidden resize-none"
              id="isi"
              rows={1}
              placeholder="Isi penjelasan idemu (< 3000 karakter)"
            ></textarea>
          </div>

          <div className="my-4">
            <textarea
              className="form-control block w-full px-2 py-3 bg-fuchsia-700 placeholder-white bg-clip-padding rounded b-transition border-none text-lg font-bold focus:outline-none overflow-hidden resize-none"
              id="tag"
              rows={1}
              placeholder="Tag idemu dan pisahkan dengan koma (1 - 4 tag)"
            ></textarea>
          </div>

          <h2 className="text-4xl font-bold text-white text-center mt-10 border-t py-4">
            Pratinjau
          </h2>
          <div>
            <p>Coba kamu ketikkan sesuatu pada mesin pembuat ide di atas</p>
          </div>
          <div className="my-4"></div>
        </div>

        <div className="lg:col-span-2 col-span-5 relative lg:mt-0 mt-5">
          <div className="flex-row space-y-3 sticky top-20">
            <button
              type="button"
              className="px-6 py-3 w-full border border-fuchsia-500 text-fuchsia-500 rounded shadow hover:bg-fuchsia-500 hover:shadow-md hover:text-white focus:outline-none focus:ring-0 b-transition font-semibold break-words"
            >
              Publikasikan
            </button>
            <button
              type="button"
              className="px-6 py-3 w-full bg-red-500 text-white rounded shadow hover:bg-red-600 hover:shadow-md focus:outline-none focus:ring-0 b- font-semibold break-words"
            >
              Hapus
            </button>
            <details className="mt-4 bg-white rounded-md">
              <summary className="font-semibold bg-fuchsia-500 text-white rounded py-3 px-6">
                Panduan
              </summary>
              <div className="grid grid-cols-5 p-4 break-words">
                <div className="col-span-3">
                  <div># Header</div>
                  <div>. . .</div>
                  <div>###### Header</div>
                  <div className="mt-4">*italics* or _italics_</div>
                  <div className="mt-4">**bold**</div>
                  <div className="mt-4">[Link](https://...)</div>
                  <div className="mt-4">* item 1</div>
                  <div>* item 2</div>
                  <div className="mt-4">1. item 1</div>
                  <div>2. item 2</div>
                  <div className="mt-4">{">"} quoted text</div>
                  <div className="mt-4">`inline code`</div>
                  <div className="mt-4">
                    <p>```</p>
                    <p>code block</p>
                    <p>```</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <div>H1 Header</div>
                  <div>. . .</div>
                  <div>H6 Header</div>
                  <div className="mt-4">
                    <i>italics</i>
                  </div>
                  <div className="mt-4">
                    <b>bold</b>
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-blue-600">
                      Link
                    </a>
                  </div>
                  <div className="mt-4">item 1</div>
                  <div>item 2</div>
                  <div className="mt-4">item 1</div>
                  <div>item 2</div>
                  <div className="border-l-[3px] border-gray-400 pl-2 mt-4">
                    quoted text
                  </div>
                  <div className="mt-4">
                    <small>inline code</small>
                  </div>
                  <div className="py-5 pl-4 bg-gray-300 mt-3">
                    <code>code block</code>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
