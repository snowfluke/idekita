import { Popover, Transition } from "@headlessui/react";
import { badges } from "@modules/markdowner";
import { Fragment } from "react";

export default function ProfileBadge({ user }) {
  return (
    <div className="flex flex-wrap mx-0 md:mx-10 justify-center mt-10 mb-7 text-fuchsia-500 font-semibold">
      {Object.values(user.title)
        .filter((title) => title)
        .map((idtitle, id) => {
          let title = badges[`${idtitle}`];
          return (
            <Popover key={id} className="relative outline-none">
              <Popover.Button className={"outline-none"}>
                <div className="mx-1 md:mx-2 mb-4">
                  <div className="px-3 py-2 article-prose prose-a:no-underline prose-a:hover:text-white bg-white border b-transition border-fuchsia-500 hover:bg-fuchsia-600 cursor-default rounded inline-block">
                    <a>
                      {title?.badge} {title?.name}
                    </a>
                  </div>
                </div>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute  z-10 w-screen max-w-sm -translate-x-1/3 lg:max-w-1xl">
                  <div className="text-sm text-center bg-white p-2 font-normal rounded-lg shadow-md">
                    {title?.desc}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          );
        })}
    </div>
  );
}
