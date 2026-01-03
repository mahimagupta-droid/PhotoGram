import Sidebar from "./Sidebar"
import USerList from "./userList"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex bg-white">
        <aside className="flex gap-x-4 bg-gray-800 w-64 h-screen left-0 top-0 z-50 lg:w-60">
            <Sidebar />
        </aside>
        <div className="lg:ml-60 lg:mr-60 p-8 flex-1 ml-36">{children}</div>
        <div className="hidden lg:block gap-x-4 bg-gray-800 p-4 w-64 h-screen left-0 top-0 z-50 lg:w-60">
            <USerList />
        </div>
    </div>
    
  )
}

export default Layout 