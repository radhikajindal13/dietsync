import {
  Home,
  Leaf,
  Calendar,
  ShoppingCart,
  Moon,
  Sun,
  LogOut,
  User,
} from 'lucide-react';

import type { Page } from '../types/navigation';

type SidebarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: {
    name: string;
    email: string;
  };
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const navItems: {
  label: string;
  page: Page;
  icon: React.ElementType;
}[] = [
  { label: 'Home', page: 'home', icon: Home },
  { label: 'Meal Feed', page: 'feed', icon: Leaf },
  { label: 'Weekly Planner', page: 'planner', icon: Calendar },
  { label: 'Grocery List', page: 'grocery', icon: ShoppingCart },
];

export function Sidebar({
  currentPage,
  onNavigate,
  user,
  theme,
  toggleTheme,
}: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r px-4 py-6 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="w-7 h-7 text-green-600" />
        <span className="text-xl font-semibold text-green-700">
          DietSync
        </span>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-gray-50">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <User className="w-5 h-5 text-green-700" />
        </div>
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, page, icon: Icon }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              currentPage === page
                ? 'bg-green-100 text-green-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>

      {/* Theme */}
      <button
        onClick={toggleTheme}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 mt-4"
      >
        {theme === 'light' ? <Moon /> : <Sun />}
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      {/* Logout */}
      <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-2">
        <LogOut />
        Logout
      </button>
    </aside>
  );
}
