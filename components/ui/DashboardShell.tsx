"use client";

import React, { useState } from "react";
import { initialInvoices, Invoice } from "@/data/mockData";
import InvoiceModal from "./InvoiceModal";
import StatCards from "./StatCards";
import TableView from "./TableView";

export default function DashboardShell() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  const handleCreateInvoice = (newInvoice: Invoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

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
        <TableView invoices={invoices} />
      </main>
    </div>
  );
}
