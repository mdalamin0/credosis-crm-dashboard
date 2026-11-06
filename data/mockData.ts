export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  status: "Paid" | "Pending";
  date: string;
}

export const initialInvoices: Invoice[] = [
  {
    id: "INV-8492",
    clientName: "Asif Zubayer",
    clientEmail: "asif@creativetech.com",
    amount: 25000,
    status: "Paid",
    date: "2026-11-01",
  },
  {
    id: "INV-3104",
    clientName: "Karim Rahman",
    clientEmail: "karim@workspace.io",
    amount: 12000,
    status: "Pending",
    date: "2026-11-02",
  },
  {
    id: "INV-9521",
    clientName: "Nusrat Jahan",
    clientEmail: "nusrat@designstudio.co",
    amount: 45000,
    status: "Paid",
    date: "2026-11-03",
  },
];
