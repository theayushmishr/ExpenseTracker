import { IndianRupee, LayoutDashboard, LogOut } from "lucide-react"

const Nav = () => {
    return (<nav className="flex justify-between border-neutral-800 border-1 rounded-2xl items-center flex-col w-fit p-4 ">
        <div><a href="" ><IndianRupee className="hover:text-[#0ae448]" /></a></div>
        <ul><li><a href=""><LayoutDashboard className="hover:text-[#0ae448]" /></a></li></ul>
        <div><a href="" ><LogOut className=" hover:text-[#0ae448]" /></a></div>
    </nav>)
}
export default Nav