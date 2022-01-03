export default function IdeaContentRight({ menu, Top }) {
  const TopElement = () => Top;
  const ideaMenu = () =>
    menu.map((menu, id) => {
      return (
        <div key={menu.name + id} className={"btn-idea-right bg-white"}>
          <button
            onClick={menu.onclick}
            disabled={menu.disabled}
            className="p-5 flex active:bg-fuchsia-500 active:outline-none w-full !cursor-pointer rounded-br-full rounded-tr-full"
          >
            <div className="btn-idea-right-after text-fuchsia-500 active:text-white">
              {menu.name}
            </div>
            <div className="btn-idea-icon">{menu.icon}</div>
          </button>
        </div>
      );
    });

  return (
    <div className="space-y-2 rounded-md border sticky top-24 flex-col">
      {TopElement()}
      {ideaMenu()}
    </div>
  );
}
