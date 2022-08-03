import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-red-300 py-4 px-3">
      <h1 className="font-semibold">OnlyFood</h1>
      <ul>
        <li>
          <Link href="/">
            <a onClick={() => console.log("clicked")}>Test link 1</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
