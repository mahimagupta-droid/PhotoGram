import { cn } from "@/lib/utils";
import addIcon from "/src/assets/icons/add.png";
import directIcon from "/src/assets/icons/direct.png";
import homeIcon from "/src/assets/icons/home.png";
import myPhotosIcon from "/src/assets/icons/myposts.png";
import notificationIcon from "/src/assets/icons/notifications.png";
import profileIcon from "/src/assets/icons/profile.png";
import settingsIcon from "/src/assets/icons/settings.png";
import logoutIcon from "/src/assets/icons/logout.png";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { useUserContext } from "@/context/userAuthContext";
const navItems = [
    {
        name: "Add",
        icon: addIcon,
        link: "/add",
    },
    {
        name: "Direct",
        icon: directIcon,
        link: "#"
    },
    {
        name: "Home",
        icon: homeIcon,
        link: "/"
    },
    {
        name: "My Photos",
        icon: myPhotosIcon,
        link: "/myposts"
    },
    {
        name: "Notifications",
        icon: notificationIcon,
        link: "#"
    },
    {
        name: "Profile",
        icon: profileIcon,
        link: "/profile"
    },
    {
        name: "Settings",
        icon: settingsIcon,
        link: "/#"
    }
]

const Sidebar = () => {
    const { pathname } = useLocation()
    const {logOut} = useUserContext()
  return (
    <nav className="flex flex-col space-y-2 relative h-screen max-w-sm w-full">
        <div className="flex justify-center m-5">
            <div className="text-white text-lg">PhotoGram</div>
        </div>
        {navItems.map((items) =>(
            <div className={cn(buttonVariants({variant: "default"}),
            //check if the specified path link is active using ternary operator and then apply the required CSS
            pathname === items.link? "bg-white text-gray-800 hover:bg-gray-700 hover:text-gray-950 rounded-none" : 
            "bg-transparent hover:bg-gray-900 rounded-none",
            "justify-start w-full"
            )} key={items.name}>
                <Link to={items.link} className="flex items-center w-full">
                    <span>
                        <img   
                            src={items.icon} 
                            className="h-5 w-5 mr-2"
                            style={{filter: `${
                                pathname === items.link? "invert(0)" : "invert(1)"
                            }`}}
                            /></span>
                    <span>{items.name}</span>
                </Link>
            </div>
        ))}
        <div className={cn(buttonVariants({variant: "default"}),
            //check if the specified path link is active using ternary operator and then apply the required CSS
            pathname === "/login"? "bg-white text-gray-800 hover:bg-gray-700 hover:text-gray-950 rounded-none" : 
            "bg-transparent hover:bg-gray-900 rounded-none",
            "justify-start w-full"
            )}>
                <Link to={"/login"} className="flex items-center w-full" onClick={logOut}>
                    <span>
                        <img   
                            src={logoutIcon} 
                            className="h-5 w-5 mr-2"
                            style={{filter: `${
                                pathname === "/login"? "invert(0)" : "invert(1)"
                            }`}}
                            /></span>
                    <span>Logout</span>
                </Link>
            </div>
    </nav>
  )
}

export default Sidebar 