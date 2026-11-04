import React from "react";
import { Users, CheckCircle2, Clock } from "lucide-react";
import { Invoice } from "@/data/mockData";

interface StatCardsProps {
  invoices: Invoice[];
}

export default function StatCards({ invoices }: StatCardsProps) {
  const totalClients = invoices.length;

  const totalEarnings = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div className="p-6 bg-gradient-to-br from-card to-primary/5 border border-primary/10 rounded-2xl shadow-[0_12px_40px_-12px_rgba(124,58,237,0.04)] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.08)] hover:border-primary/20 transition-all duration-300 group flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-primary/70 uppercase tracking-wider">
            Total Clients
          </p>
          <h3 className="text-3xl font-black mt-2 tracking-tight text-primary">
            {totalClients}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center text-primary transition-all">
          <Users className="h-5 w-5" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-card to-emerald-500/5 border border-emerald-500/10 rounded-2xl shadow-[0_12px_40px_-12px_rgba(16,185,129,0.04)] hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.08)] hover:border-emerald-500/20 transition-all duration-300 group flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">
            Total Earnings
          </p>
          <h3 className="text-3xl font-black mt-2 tracking-tight text-emerald-600">
            ৳{totalEarnings.toLocaleString()}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/15 flex items-center justify-center text-emerald-600 transition-all">
          <CheckCircle2 className="h-5 w-5" />
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-card to-destructive/5 border border-destructive/10 rounded-2xl shadow-[0_12px_40px_-12px_rgba(239,68,68,0.04)] hover:shadow-[0_12px_40px_-8px_rgba(239,68,68,0.08)] hover:border-destructive/20 transition-all duration-300 group flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-destructive/70 uppercase tracking-wider">
            Pending Amount
          </p>
          <h3 className="text-3xl font-black mt-2 tracking-tight text-destructive">
            ৳{pendingAmount.toLocaleString()}
          </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-destructive/10 group-hover:bg-destructive/15 flex items-center justify-center text-destructive transition-all">
          <Clock className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
