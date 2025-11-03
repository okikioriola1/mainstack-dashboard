import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Download, ChevronDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
// import IncomingIcon from "../../assets/icons/incoming.svg";
// import OutgoingIcon from "../../assets/icons/outgoing.svg";
// import LinkInBioIcon from "../../assets/icons/side-link-in-bio-icon.svg";
// import StoreIcon from "../../assets/icons/side-store-icon.svg";
// import MediaKitIcon from "../../assets/icons/side-media-kit-icon.svg";
// import InvoicingIcon from "../../assets/icons/side-invoicing-icon.svg";
import FilterModal from "../../components/FilterModal";
import {
  fetchRevenueData,
  fetchTransactions,
  fetchUserData,
} from "../../api/revenueApi";
import { SummaryItem } from "../../components/SummaryItem";
import TransactionList from "../../components/TransactionList";
import Sidebar from "../../components/Sidebar";

const chartData = [
  { date: "Apr 1", amount: 400 },
  { date: "Apr 7", amount: 700 },
  { date: "Apr 14", amount: 500 },
  { date: "Apr 21", amount: 900 },
  { date: "Apr 30", amount: 600 },
];
// const summaryItems = [
//   { label: "Ledger Balance", value: "USD 0.00" },
//   { label: "Total Payout", value: "USD 55,080.00" },
//   { label: "Total Revenue", value: "USD 175,580.00" },
//   { label: "Pending Payout", value: "USD 0.00" },
// ];
// const transactions = [
//   {
//     title: "Psychology of Money",
//     subtitle: "Roy Cash",
//     amount: "USD 600",
//     date: "Apr 03, 2022",
//   },
//   {
//     title: "Buy me a coffee",
//     subtitle: "Jonathan Smart",
//     amount: "USD 100",
//     date: "Apr 02, 2022",
//   },
//   {
//     title: "How to build an online brand",
//     subtitle: "Robert Jackson",
//     amount: "USD 100",
//     date: "Apr 02, 2022",
//   },
// ];

const formatCurrency = (amount: number) =>
  `USD ${amount.toLocaleString("en-US")}`;
const Dashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [transactionsData, setTransactionsData] = useState<any>(null);
  useEffect(() => {
    fetchUserData().then((data) => setUserData(data));
    fetchRevenueData().then((data) => setRevenueData(data));
    fetchTransactions().then((data) => setTransactionsData(data));
  }, []);
  console.log("User Data:", userData);
  // console.log("revenue Data:", revenueData);
  // console.log("transactions Data:", transactionsData);
  return (
    <div className="relative font-degular bg-white min-h-screen mt-30 w-full">
      <div className="fixed z-[5] top-5 w-full">
        <Navbar />
      </div>
      <Sidebar />

      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex w-full justify-between">
          <div className="flex w-3/4 flex-col gap-8">
            <div className="flex flex-row items-center gap-8">
              <div>
                <p className="text-sm text-gray-500">Available Balance</p>
                <h1 className="text-4xl font-bold text-gray-900">
                  {formatCurrency(revenueData?.balance || 0)}
                </h1>
              </div>
              <div>
                <button className="bg-black text-white px-6 py-3 rounded-full font-medium">
                  Withdraw
                </button>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-10">
              {/* Chart */}
              <div className="col-span-2">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#FF6600"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>Apr 1, 2022</span>
                  <span>Apr 30, 2022</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-1/4 flex-col gap-5">
            <SummaryItem
              label="Ledger Balance"
              value={formatCurrency(revenueData?.ledger_balance || 0)}
            />
            <SummaryItem
              label="Total Payout"
              value={formatCurrency(revenueData?.total_payout || 0)}
            />
            <SummaryItem
              label="Total Revenue"
              value={formatCurrency(revenueData?.total_revenue || 0)}
            />
            <SummaryItem
              label="Pending Payout"
              value={formatCurrency(revenueData?.pending_payout || 0)}
            />
          </div>
        </div>
        <div className="mt-14">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">
                {transactionsData?.length || 0} Transactions
              </h2>
              <p className="text-sm text-gray-500">
                Your transactions for the last 7 days
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilter(true)}
                className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
              >
                Filter
                <span>
                  <ChevronDown className="w-4 h-4 text-[#131316]" />
                </span>
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                Export list{" "}
                <span>
                  <Download className="w-4 h-4 text-[#131316]" />
                </span>
              </button>
            </div>
          </div>
          <TransactionList transactions={transactionsData || []} />
          {/* 
          <div className="mt-6 border-t border-gray-100">
            {transactionsData?.map((tx, i) => (
              <div
                key={i}
                className={`flex justify-between items-center py-5 ${
                  i !== transactions.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <img src={IncomingIcon} alt="Incoming" className="w-6 h-6" />
                  <div>
                    <p className="font-medium text-gray-800">{tx.title}</p>
                    <p className="text-sm text-gray-500">{tx.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{tx.amount}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <FilterModal open={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  );
};

export default Dashboard;
