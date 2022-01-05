/** Layout for the idea page (used twice) */
/** 4:1 Layout with sidebar on the right */

import { useState } from "react";
import { Children } from "react";

export default function IdeaLayout(props) {
  const [sidebar, setSidebar] = useState(true);

  const Components = Children.toArray(props.children);

  return (
    <div id="ideaContainer" className="flex my-5 relative">
      <div id="ideaContent" className="flex-auto w-[full] md:w-[80%]">
        {Components[0]}
      </div>

      <div
        id="ideaRightButtons"
        className={
          sidebar
            ? "flex-1 h-[100%] md:block md:static hidden"
            : "flex-1 h-[100%] fixed left-0"
        }
      >
        {Components[1]}
      </div>

      {/* <!-- burger --> */}
      <div
        onClick={() => {
          setSidebar(!sidebar);
        }}
        className="cursor-pointer h-10 bg-fuchsia-500 pt-[2px] px-3 rounded-md md:hidden float-right text-center leading-snug fixed right-0 mr-2 opacity-40"
      >
        <div className="burger-div bg-white mt-2"></div>
        <div className="burger-div bg-white my-[5px]"></div>
        <div className="burger-div bg-white"></div>
      </div>
    </div>
  );
}
