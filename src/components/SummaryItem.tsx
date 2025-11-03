import { Info } from "lucide-react";
export const SummaryItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <div className="flex-col items-center">
    <div className="flex justify-between items-center gap-2 text-sm">
      <span className="text-[#56616B]">{label}</span>
      <Info className="w-4 h-4 text-gray-400" />
    </div>
    <span className="text-[28px] font-bold text-[#131316]">
      {value || "USD 0.00"}
    </span>
  </div>
);
