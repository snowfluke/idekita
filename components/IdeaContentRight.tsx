export default function IdeaContentRight({ TopElement, menu }) {
  const ideaMenu = () =>
    menu.map((menu) => {
      return (
        <div
          key={menu.name}
          className="flex-1 rounded-tr-full border-l-4 hover:translate-x-10 transition border-dashed border-fuchsia-500 rounded-br-full  bg-white  rounded-md content-center"
        >
          <div
            onClick={menu.onclick}
            className="p-5 flex active:bg-fuchsia-500 !cursor-pointer rounded-br-full rounded-tr-full"
          >
            <div className="flex flex-grow text-lg font-bold text-fuchsia-500 active:text-white select-none">
              {menu.name}
            </div>
            <div className="flex-none w-8 text-center bg-gray-100 text-lg rounded-full p-[2px] prose justify-self-end select-none">
              {menu.icon}
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="space-y-2 rounded-md border sticky top-24 flex-col">
      {TopElement && <TopElement />}
      {ideaMenu()}
    </div>
  );
}
