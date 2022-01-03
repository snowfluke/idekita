import { UserContext } from "@modules/contexter";
import { useContext } from "react";
import ReactMarkdown from "react-markdown";

export default function Modal() {
  const { modalData, modal } = useContext(UserContext);

  return (
    <>
      <div className={"transition duration-700"}>
        <div
          onClick={modal.closeModal}
          className="w-full h-full fixed z-40 top-0 left-0 opacity-25 bg-black backdrop-blur-sm"
        ></div>
        <div className="w-full h-[90%] fixed z-50 bottom-0 overflow-y-none">
          <div className="relative bg-white rounded-t-3xl w-full h-full p-10 overflow-x-scroll">
            <div className=" w-[70px] h-[70px] sticky top-5 right-5 flex float-right">
              <button
                onClick={modal.closeModal}
                className="w-full h-full text-lg hover:bg-fuchsia-300 bg-fuchsia-100 rounded-lg transition hover:scale-110 duration-500"
              >
                ❌
              </button>
            </div>
            <div className="article-prose mx-auto">
              <h1>{modalData.title}</h1>
              <hr />

              <ReactMarkdown>{modalData.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
