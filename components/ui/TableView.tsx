import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Invoice } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoicePreviewModal from "./InvoicePreviewModal";

interface TableViewProps {
  invoices: Invoice[];
}

export default function TableView({ invoices }: TableViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Invoices & Directory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage and track all generated client receipts.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder="Search name, email or ID..."
            className="pl-9 bg-secondary/50 border-border rounded-xl text-sm h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-[120px] font-semibold text-muted-foreground">Invoice ID</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Client</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Date</TableHead>
              <TableHead className="text-right font-semibold text-muted-foreground">Amount</TableHead>
              <TableHead className="text-center font-semibold text-muted-foreground">Status</TableHead>
              <TableHead className="w-[100px] text-center font-semibold text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-secondary/10 transition-colors">
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    {invoice.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold tracking-tight">{invoice.clientName}</div>
                    <div className="text-xs text-muted-foreground">{invoice.clientEmail}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-right font-bold tracking-tight">
                    ৳{invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${
                        invoice.status === "Paid"
                          ? "bg-accent/40 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8  px-2.5 border-primary/20 text-primary hover:bg-primary/5 font-medium text-xs gap-1.5 transition-all"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Preview
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-sm text-muted-foreground">
                  No matches found for your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <InvoicePreviewModal
        invoice={selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
      />
    </div>
  );
}
