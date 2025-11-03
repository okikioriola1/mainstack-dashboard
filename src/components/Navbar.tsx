import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Bell,
  Menu,
  BarChart3,
  MessageSquareMore,
  ChevronRight,
} from "lucide-react";
import MainstackLogo from "../assets/icons/mainstack-logo.svg";
import HomeIcon from "../assets/icons/nav-home-icon.svg";
import AnalyticsIcon from "../assets/icons/nav-analytics-icon.svg";
// import RevenueIcon from "../assets/icons/nav-crm-icon.svg";
import CrmIcon from "../assets/icons/nav-crm-icon.svg";
import AppsIcon from "../assets/icons/nav-apps-icon.svg";
import LinkInBioIcon from "../assets/icons/side-link-in-bio-icon.svg";
import StoreIcon from "../assets/icons/side-store-icon.svg";
import MediaKitIcon from "../assets/icons/side-media-kit-icon.svg";
import InvoicingIcon from "../assets/icons/side-invoicing-icon.svg";
const Navbar = () => {
  const [appsOpen, setAppsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const apps = [
    {
      id: 1,
      title: "Link in Bio",
      description: "Manage your Link in Bio",
      icon: LinkInBioIcon,
    },
    {
      id: 2,
      title: "Store",
      description: "Manage your Store activities",
      icon: StoreIcon,
    },
    {
      id: 3,
      title: "Media Kit",
      description: "Manage your Media Kit",
      icon: MediaKitIcon,
    },
    {
      id: 4,
      title: "Invoicing",
      description: "Manage your Invoices",
      icon: InvoicingIcon,
    },
    {
      id: 5,
      title: "Bookings",
      description: "Manage your Bookings",
      icon: StoreIcon,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAppsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="w-[97%] mx-auto px-8 py-4 bg-white shadow-sm rounded-[100px]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <img src={MainstackLogo} alt="logo" className="w-[36px] h-[36px]" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-2xl px-3 py-1 font-medium text-sm transition"
          >
            <img src={HomeIcon} alt="nav-home" className="w-[18px] h-[18px]" />
            Home
          </a>

          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-2xl px-3 py-1 font-medium text-sm transition"
          >
            <img
              src={AnalyticsIcon}
              alt="nav-analytics"
              className="w-[18px] h-[18px]"
            />
            Analytics
          </a>

          <button className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-900 transition">
            <BarChart3 size={16} />
            Revenue
          </button>

          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-2xl px-3 py-1 font-medium text-sm transition"
          >
            <img src={CrmIcon} alt="nav-crm" className="w-[18px] h-[18px]" />
            CRM
          </a>

          {/* <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-2xl px-3 py-1 font-medium text-sm transition"
          >
            <img src={AppsIcon} alt="logo" className="w-[18px] h-[18px]" />
            Apps
          </a> */}
          <div className="relative" ref={dropdownRef}>
            {!appsOpen && (
              <button
                onClick={() => setAppsOpen(!appsOpen)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition ${
                  appsOpen
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <span>
                  <img
                    src={AppsIcon}
                    alt="logo"
                    className="w-[18px] h-[18px]"
                  />
                </span>
                Apps
              </button>
            )}
            {appsOpen && (
              <button
                onClick={() => setAppsOpen(!appsOpen)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition ${
                  appsOpen
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <span>
                  <img
                    src={AppsIcon}
                    alt="logo"
                    className="w-[18px] h-[18px] text-[#fff]"
                  />
                </span>
                <span className="">Apps</span>
                <span className="w-[1px] h-[30px] bg-[#f0f1f7]" />
                <span className=""> Link in Bio </span>
                <span>
                  <ChevronDown size={16} />
                </span>
              </button>
            )}

            {/* Dropdown Menu */}
            {appsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 bg-white rounded-3xl shadow-2xl p-6 z-50">
                {/* Apps List */}
                <div className="space-y-3">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 border border-gray-100 rounded-2xl flex items-center justify-center text-2xl transition">
                          <img src={app.icon} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {app.title}
                          </h3>
                          <p className="text-gray-500 text-xs">
                            {app.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ChevronRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition">
            <Bell size={20} />
          </button>

          <button className="p-2 text-gray-600 hover:text-gray-900 transition hidden md:block">
            <MessageSquareMore size={20} />
          </button>

          <div className="flex items-center gap-3 bg-[#EFF1F6] px-3 py-1 rounded-full">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center font-semibold text-white text-sm">
              <h2>OJ</h2>
            </div>

            <button className="p-2 text-gray-600 hover:text-gray-900 transition">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
