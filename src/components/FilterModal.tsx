import React, { useCallback, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import DatePicker from "./DatePicker";

const transactionTypes = [
  "Store Transactions",
  "Get Tipped",
  "Withdrawals",
  "Chargebacks",
  "Cashbacks",
  "Refer & Earn",
];

const transactionStatuses = ["Successful", "Pending", "Failed"];

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose }) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleStartDateChange = useCallback(
    (date: Date | null) => setFromDate(date),
    []
  );
  const handleEndDateChange = useCallback(
    (date: Date | null) => setToDate(date),
    []
  );

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full overflow-y-auto shadow-lg p-6 rounded-l-2xl animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filter</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quick Date Range Buttons */}
        <div className="flex gap-2 mb-6">
          {["Today", "Last 7 days", "This month", "Last 3 months"].map(
            (label) => (
              <button
                key={label}
                className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-4 mb-6">
          <p className="text-sm text-gray-600 font-medium">Date Range</p>
          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <DatePicker
                label=""
                date={fromDate}
                type="from"
                onChange={handleStartDateChange}
                maxDate={toDate || new Date()}
                placeholder="17 Jul 2023"
              />
            </div>
            <div className="w-1/2">
              <DatePicker
                label=""
                date={toDate}
                type="to"
                onChange={handleEndDateChange}
                minDate={fromDate || undefined}
                maxDate={new Date()}
                placeholder="17 Aug 2023"
                rightCalendar
              />
            </div>
          </div>
        </div>

        {/* Transaction Type */}
        <div className="mb-6 relative">
          <p className="text-sm text-gray-600 font-medium mb-2">
            Transaction Type
          </p>
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50"
          >
            <span className="truncate">
              {selectedTypes.length
                ? selectedTypes.join(", ")
                : "Select transaction types"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showTypeDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showTypeDropdown && (
            <div className="absolute mt-2 bg-white shadow-md rounded-xl border border-gray-100 w-full z-50 max-h-60 overflow-y-auto">
              {transactionTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="accent-[#000000] w-4 h-4 rounded"
                  />
                  <span className="text-gray-800 text-sm">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Transaction Status */}
        <div className="mb-8 relative">
          <p className="text-sm text-gray-600 font-medium mb-2">
            Transaction Status
          </p>
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50"
          >
            <span className="truncate">
              {selectedStatuses.length
                ? selectedStatuses.join(", ")
                : "Select statuses"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showStatusDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showStatusDropdown && (
            <div className="absolute mt-2 bg-white shadow-md rounded-xl border border-gray-100 w-full z-50">
              {transactionStatuses.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="accent-black w-4 h-4 rounded"
                  />
                  <span className="text-gray-800 text-sm">{status}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => {
              setSelectedTypes([]);
              setSelectedStatuses([]);
              setFromDate(null);
              setToDate(null);
            }}
            className="flex-1 border border-gray-200 rounded-full py-2 text-gray-700 hover:bg-gray-100 font-medium"
          >
            Clear
          </button>
          <button
            className={`flex-1 rounded-full py-2 font-medium ${
              selectedTypes.length || selectedStatuses.length
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (selectedTypes.length || selectedStatuses.length) {
                // Apply filters logic here
                onClose();
              }
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
