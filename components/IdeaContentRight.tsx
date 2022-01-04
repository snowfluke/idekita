/** Custom component to wrap right sidebar in mesin-ide and individual idea post, separate cloud count and the button */

export default function IdeaContentRight({ menu, Top }) {
  const TopElement = () => Top;
  const ideaMenu = () =>
    menu.map((menu, id) => {
      return (
        <div key={menu.name + id} className={"btn-idea-right bg-white"}>
          <button
            onClick={menu.onclick}
            disabled={menu.disabled}
            className="btn-idea-content !cursor-pointer "
          >
            <div className="span-idea-content">{menu.name}</div>
            <div className="btn-idea-icon">{menu.icon}</div>
          </button>
        </div>
      );
    });

  return (
    <div className="space-y-2 rounded-md md:bg-transparent md:pr-0 md:pt-0 md:pb-0 md:border-0 bg-white pr-10 py-10 sticky top-24 flex-col border-2">
      {TopElement()}
      {ideaMenu()}
    </div>
  );
}
