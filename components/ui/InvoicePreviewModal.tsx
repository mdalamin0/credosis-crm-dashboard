import React, { useState } from "react";
import { Invoice } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2, Clock } from "lucide-react";
import jsPDF from "jspdf";

interface InvoicePreviewModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export default function InvoicePreviewModal({
  invoice,
  onClose,
}: InvoicePreviewModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!invoice) return null;

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.setFillColor(124, 58, 237);
      pdf.rect(0, 0, 210, 15, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(15, 23, 42);
      pdf.text("Credosis CRM Solutions", 20, 35);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text("Dhaka, Bangladesh", 20, 42);

      pdf.setFont("helvetica", "mono");
      pdf.setFontSize(11);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`${invoice.id}`, 190, 35, { align: "right" });

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Date: ${invoice.date}`, 190, 42, { align: "right" });

      pdf.setDrawColor(226, 232, 240);
      pdf.line(20, 52, 190, 52);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text("BILLED TO", 20, 64);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      pdf.text(invoice.clientName, 20, 72);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text(invoice.clientEmail, 20, 78);

      pdf.setFillColor(241, 245, 249);
      pdf.rect(20, 90, 170, 8, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139);
      pdf.text("DESCRIPTION", 24, 95);
      pdf.text("AMOUNT", 186, 95, { align: "right" });

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85);
      pdf.text("Premium SaaS Platform Development Services", 24, 110);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(15, 23, 42);
      pdf.text(`BDT ${invoice.amount.toLocaleString()}`, 186, 110, {
        align: "right",
      });

      pdf.line(20, 118, 190, 118);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text("STATUS", 20, 132);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      if (invoice.status === "Paid") {
        pdf.setTextColor(16, 185, 129);
        pdf.text("PAID", 20, 140);
      } else {
        pdf.setTextColor(245, 158, 11);
        pdf.text("PENDING", 20, 140);
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text("TOTAL DUE", 186, 132, { align: "right" });

      pdf.setFont("helvetica", "black");
      pdf.setFontSize(18);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`BDT ${invoice.amount.toLocaleString()}`, 186, 142, {
        align: "right",
      });

      pdf.save(`Invoice_${invoice.id}.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={!!invoice} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl bg-card p-6 border-border overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <DialogTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Invoice Preview
          </DialogTitle>
        </DialogHeader>

        <div className="my-6 border border-border/60 rounded-xl p-6 bg-white text-slate-900">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
            <div>
              <div className="h-7 w-7 rounded-lg bg-purple-600 flex items-center justify-center mb-2">
                <span className="text-white font-black text-xs">C</span>
              </div>
              <h4 className="font-bold text-sm tracking-tight">
                Credosis CRM Solutions
              </h4>
              <p className="text-[10px] text-slate-400">Dhaka, Bangladesh</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-400 block">
                {invoice.id}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">
                {invoice.date}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Billed To
              </span>
              <span className="font-bold text-sm block mt-0.5">
                {invoice.clientName}
              </span>
              <span className="text-xs text-slate-500 block">
                {invoice.clientEmail}
              </span>
            </div>
          </div>

          <div className="border border-slate-100 rounded-lg overflow-hidden mb-6">
            <div className="grid grid-cols-3 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <div className="col-span-2">Description</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-3 text-xs font-medium border-b border-slate-50">
              <div className="col-span-2 text-slate-700">
                Premium SaaS Platform Development Services
              </div>
              <div className="text-right font-bold text-slate-900">
                ৳{invoice.amount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5">
              {invoice.status === "Paid" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" /> Paid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600">
                  <Clock className="h-3 w-3" /> Pending
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-slate-400 block">
                Total Due
              </span>
              <span className="text-xl font-black text-slate-900 tracking-tight block">
                ৳{invoice.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full h-11 text-xs font-semibold"
          >
            Close
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-full h-11 bg-primary text-primary-foreground text-xs font-semibold gap-2 shadow-lg shadow-primary/10"
          >
            <Download className="h-4 w-4" />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
