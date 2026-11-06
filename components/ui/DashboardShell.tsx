"use client";

import React, { useState } from "react";
import { initialInvoices, Invoice } from "@/data/mockData";
import InvoiceModal from "./InvoiceModal";
import StatCards from "./StatCards";
import TableView from "./TableView";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardShell() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const handleCreateInvoice = (newInvoice: Invoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const chartData = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((acc: { date: string; amount: number }[], inv) => {
      const existing = acc.find((item) => item.date === inv.date);
      if (existing) {
        existing.amount += inv.amount;
      } else {
        acc.push({ date: inv.date, amount: inv.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-background antialiased selection:bg-primary/10 selection:text-primary">
      <header className="border-b border-border/80 bg-card/70 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-primary-foreground font-black text-base">
                C
              </span>
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight block leading-none">
                Credosis CRM
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mt-0.5">
                SaaS Core
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <InvoiceModal onCreateInvoice={handleCreateInvoice} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Financial Overview
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Monitor your client billing and real-time revenue performance.
          </p>
        </div>

        <StatCards invoices={invoices} />

        <div className="bg-card border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight">
              Revenue Analytics
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Visual representation of real-time paid invoice performance.
            </p>
          </div>
          <div className="h-[240px] w-full mt-6" suppressHydrationWarning>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    borderColor: "var(--color-border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Revenue"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <TableView invoices={invoices} />
      </main>
    </div>
  );
}
