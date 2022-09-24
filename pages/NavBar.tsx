import Link from "next/link";


export const NavBar = () => {
    return (<header className="bg-black mx-auto w-96 rounded-b-lg fixedAWSD">
    <ul className="text-primary font-semibold underline p-4 flex flex-row gap-x-12 justify-center"> 
      <li>
        Blog
      </li>
      <li>
        <Link href="/Projects">
        Projects
        </Link>
      </li>
      <li>
        <Link href="/">
        About
        </Link>
      </li>
      <li>CV</li>
    </ul>
  </header>);
}

export default NavBar