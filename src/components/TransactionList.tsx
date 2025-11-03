import React from "react";
import IncomingIcon from "../assets/icons/incoming.svg";
import OutgoingIcon from "../assets/icons/outgoing.svg";
import formatDate from "../hooks/formatDate";
// import { useTransactions } from "@/hooks/useTransactions";

const TransactionList = ({ transactions }: { transactions: any }) => {
  //   const { transactions } = useTransactions();
  const formatCurrency = (amount: number) =>
    `USD ${amount.toLocaleString("en-US")}`;
  return (
    <div className="mt-6 border-t border-gray-100">
      {transactions.map((tx, i) => (
        <div
          key={i}
          className={`flex justify-between items-center py-5 ${
            i !== transactions.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Choose icon dynamically */}
            <img
              src={tx.type === "deposit" ? IncomingIcon : OutgoingIcon}
              alt={tx.type}
              className="w-6 h-6"
            />

            {/* Left section (title + subtitle) */}
            <div>
              <p className="font-medium text-gray-800">
                {tx.type === "deposit"
                  ? tx.metadata?.name ?? "Deposit"
                  : "Withdrawal"}
              </p>
              <p className="text-sm text-gray-500">
                {tx.type === "deposit"
                  ? tx.metadata?.product_name ?? tx.metadata?.type ?? "Payment"
                  : "Funds withdrawn"}
              </p>
            </div>
          </div>

          {/* Right section (amount + date) */}
          <div className="text-right">
            <p className={`text-base font-bold text-[#131316]`}>
              {formatCurrency(tx.amount)}
            </p>
            <p className="text-sm text-gray-500">{formatDate(tx.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
