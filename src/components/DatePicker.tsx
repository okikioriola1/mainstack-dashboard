// import React, { useState, useRef, useEffect } from "react";
// import { ChevronRight, X } from "lucide-react";
// // import Cal from "../../assets/Icons/CalenderBg.svg";
// import { Calendar } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// interface DatePickerProps {
//   label: string;
//   date: Date | null;
//   type: "from" | "to";
//   onChange: (date: Date | null) => void;
//   disabled?: boolean;
//   placeholder?: string;
//   minDate?: Date;
//   maxDate?: Date;
// }

// const DatePicker: React.FC<DatePickerProps> = ({
//   label,
//   date,
//   type,
//   onChange,
//   disabled = false,
//   placeholder,
//   minDate,
//   maxDate,
// }) => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const calendarRef = useRef<HTMLDivElement>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(date);

//   useEffect(() => {
//     setSelectedDate(date);
//   }, [date]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         calendarRef.current &&
//         !calendarRef.current.contains(event.target as Node)
//       ) {
//         setShowCalendar(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDateChange = (newDate: Date) => {
//     setSelectedDate(newDate);
//     onChange(newDate);
//     setShowCalendar(false);
//   };

//   const handleCalendarClick = () => {
//     if (!disabled) {
//       setShowCalendar(!showCalendar);
//     }
//   };

//   const handleClearDate = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setSelectedDate(null);
//     onChange(null);
//     setShowCalendar(false);
//   };

//   // Set default constraints
//   const defaultMaxDate = maxDate || new Date();
//   const defaultMinDate = minDate;

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getDisplayText = () => {
//     if (selectedDate) {
//       return formatDate(selectedDate);
//     }
//     return placeholder || `Select ${type} date`;
//   };

//   return (
//     <div className="relative" ref={calendarRef}>
//       <div
//         className={`bg-[#F6F7F8] h-full p-[6px] rounded-xl flex justify-start flex-row gap-3 transition-colors ${
//           disabled
//             ? "cursor-not-allowed opacity-50"
//             : "cursor-pointer hover:bg-[#EDEEF0]"
//         }`}
//         onClick={handleCalendarClick}
//       >

//         <div className="flex flex-col gap-1 flex-grow">
//           <p className="text-[#1E1E1E] text-[14px]">{label}</p>
//           <div className="flex items-center flex-row text-[12px] font-medium">
//             <p className={selectedDate ? "text-[#1E1E1E]" : "text-[#888]"}>
//               {getDisplayText()}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-2">
//           {selectedDate && !disabled && (
//             <button
//               onClick={handleClearDate}
//               className="p-1 hover:bg-[#E5E5E5] rounded-full transition-colors"
//               title="Clear date"
//             >
//               <X className="w-[12px] h-[12px] text-[#666]" />
//             </button>
//           )}
//           <ChevronRight
//             className={`w-[14px] h-[14px] text-[#454545] transition-transform ${
//               showCalendar ? "rotate-90" : ""
//             }`}
//           />
//         </div>
//       </div>

//       {showCalendar && !disabled && (
//         <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg z-50 overflow-hidden">
//           <div className="p-2">
//             <Calendar
//               date={selectedDate || new Date()}
//               onChange={(newDate: Date) => handleDateChange(newDate)}
//               maxDate={defaultMaxDate}
//               minDate={defaultMinDate}
//               color="#000000"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatePicker;

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  label: string;
  date: Date | null;
  type: "from" | "to";
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  rightCalendar?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  date,
  type,
  onChange,
  disabled = false,
  placeholder,
  minDate,
  maxDate,
  rightCalendar = false,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    onChange(newDate);
    setShowCalendar(false);
  };

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange(null);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const displayText = selectedDate
    ? formatDate(selectedDate)
    : placeholder || `Select ${type} date`;

  const defaultMaxDate = maxDate || new Date();

  return (
    <div className="relative w-full" ref={calendarRef}>
      {/* Label */}
      <label className="block text-sm text-[#3D3D3D] mb-1">{label}</label>

      {/* Input */}
      <div
        onClick={() => !disabled && setShowCalendar((prev) => !prev)}
        className={`w-full border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between text-sm text-[#1E1E1E] ${
          disabled
            ? "cursor-not-allowed bg-gray-100 opacity-50"
            : "cursor-pointer hover:border-gray-400 transition"
        }`}
      >
        <span
          className={`truncate ${
            selectedDate ? "text-[#1E1E1E]" : "text-gray-400"
          }`}
        >
          {displayText}
        </span>

        <div className="flex items-center gap-1">
          {selectedDate && !disabled && (
            <button
              onClick={handleClearDate}
              className="p-1 hover:bg-gray-100 rounded-full transition"
              title="Clear date"
            >
              <X className="w-[12px] h-[12px] text-gray-500" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              showCalendar ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && !disabled && (
        <div
          className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-2xl z-50 p-3 shadow-sm ${
            rightCalendar ? "right-0" : "left-0"
          }`}
        >
          <Calendar
            date={selectedDate || new Date()}
            onChange={(newDate: Date) => handleDateChange(newDate)}
            color="#000000"
            maxDate={defaultMaxDate}
            minDate={minDate}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
