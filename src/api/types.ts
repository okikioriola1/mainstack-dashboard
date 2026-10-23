export type UserData = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

export type Wallet = {
  balance: number;
  ledger_balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
};

export type Transaction = {
  amount: number;
  metadata?: {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: string;
  type: "deposit" | "withdrawal";
  date: string;
};
