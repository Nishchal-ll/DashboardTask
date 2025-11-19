import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <nav className="flex flex-col gap-4">
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) =>
            isActive ? "text-blue-300" : "hover:text-blue-300"
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/data" 
          className={({ isActive }) =>
            isActive ? "text-blue-300" : "hover:text-blue-300"
          }
        >
          Data
        </NavLink>
      </nav>
    </aside>
  );
}
