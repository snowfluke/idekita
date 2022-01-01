export default function IdeaLayout(props) {
  return (
    <div id="ideaContainer" className="flex my-5 relative">
      <div id="ideaContent" className="flex-auto w-[80%]">
        {props.MainComponent}
      </div>
      <div id="ideaRightButtons" className="flex-1 h-[100%]">
        {props.SidebarComponent}
      </div>
    </div>
  );
}
