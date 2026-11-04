import React, { useState } from "react";
import { Invoice } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface InvoiceModalProps {
  onCreateInvoice: (newInvoice: Invoice) => void;
}

export default function InvoiceModal({ onCreateInvoice }: InvoiceModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"Paid" | "Pending">("Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !amount) return;

    const newInvoice: Invoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: name,
      clientEmail: email,
      amount: Number(amount),
      status: status,
      date: new Date().toISOString().split("T")[0],
    };

    onCreateInvoice(newInvoice);
    setName("");
    setEmail("");
    setAmount("");
    setStatus("Pending");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-full shadow-xl shadow-primary/10 hover:opacity-90 active:scale-95 transition-all cursor-pointer">
          <Plus className="h-4 w-4" />
          New Invoice
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-card p-6 border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Generate Invoice
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Client Name
            </label>
            <Input
              type="text"
              required
              className="bg-secondary/40 border-border rounded-full h-11"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Client Email
            </label>
            <Input
              type="email"
              required
              className="bg-secondary/40 border-border rounded-full h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Amount (BDT)
            </label>
            <Input
              type="number"
              required
              className="bg-secondary/40 border-border rounded-full h-11"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </label>
            <Select
              value={status}
              onValueChange={(value: "Paid" | "Pending" | null) => {
                if (value) setStatus(value);
              }}
            >
              <SelectTrigger className="bg-secondary/40 border-border rounded-full h-11 w-full text-left">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-full">
                <SelectItem
                  value="Paid"
                  className="focus:bg-secondary rounded-lg"
                >
                  Paid
                </SelectItem>
                <SelectItem
                  value="Pending"
                  className="focus:bg-secondary rounded-lg"
                >
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full h-11 bg-primary text-primary-foreground font-semibold rounded-full mt-2"
          >
            Create Invoice
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
