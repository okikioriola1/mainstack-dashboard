import { useState } from "react";
import LinkInBioIcon from "../assets/icons/side-link-in-bio-icon.svg";
import StoreIcon from "../assets/icons/side-store-icon.svg";
import MediaKitIcon from "../assets/icons/side-media-kit-icon.svg";
import InvoicingIcon from "../assets/icons/side-invoicing-icon.svg";

const Sidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const items = [
    { id: 1, label: "Link in Bio", icon: LinkInBioIcon },
    { id: 2, label: "Store", icon: StoreIcon },
    { id: 3, label: "Media Kit", icon: MediaKitIcon },
    { id: 4, label: "Invoicing", icon: InvoicingIcon },
  ];
  return (
    <div className="fixed left-6 top-[400px] -translate-y-1/2 flex flex-col items-center gap-5 bg-white rounded-[100px] shadow-xl py-4 px-2 ">
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          {hoveredIndex === index && (
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium pointer-events-none z-50 flex items-center gap-2">
              {item.label}
              {/* Arrow pointing left */}
              <div className="absolute right-full w-0 h-0 border-t-4 border-b-4 border-r-4 border-r-black border-t-transparent border-b-transparent"></div>
            </div>
          )}
          <button
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50"
          >
            <span className="text-lg">
              <img
                src={item.icon}
                className={`transition-all duration-200 ${
                  hoveredIndex === index ? "grayscale-0" : "grayscale"
                }`}
              />
            </span>
          </button>
        </div>
      ))}
      {/* <div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg">
            <img src={StoreIcon} />
          </span>
        </button>
      </div>
      <div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg">
            <img src={MediaKitIcon} />
          </span>
        </button>
      </div>
      <div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg">
            <img src={InvoicingIcon} />
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
