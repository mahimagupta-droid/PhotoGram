import Sidebar from "./Sidebar";
import UserList from "./userList"; // Fixed typo

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar - Fixed Left */}
      <aside className="fixed left-0 top-0 h-screen w-0 sm:w-16 lg:w-60 bg-gray-800 z-50 transition-all overflow-hidden">
        <Sidebar />
      </aside>

      {/* Main Content - Pushed by Sidebar */}
      <main className="flex-1 p-8 sm:ml-16 lg:ml-60 lg:mr-60 w-full">
        {children}
      </main>

      {/* Right UserList - Fixed Right (Hidden on mobile) */}
      <aside className="hidden lg:block fixed right-0 top-0 h-screen w-60 bg-gray-800 p-4 z-50">
        <UserList />
      </aside>
    </div>
  );
};

export default Layout;