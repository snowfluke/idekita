export default function NavSearch() {
  return (
    <div id="search-input" className="relative ml-6 samax-w-lg hidden md:block">
      <input
        className="border-2 bg-gray-200 transition h-10 px-5 pr-28 rounded-md focus:outline-none w-72 md:w-96 text-gray-800 text-sm "
        type="text"
        name="search"
        placeholder="Cari ide brilian ..."
      />
      <button
        type="submit"
        className="mr-[5px] absolute right-0 top-1 text-white bg-fuchsia-500 hover:bg-fuchsia-600 rounded-md px-7 py-1 b-transition"
      >
        #Cari
      </button>
    </div>
  );
}
