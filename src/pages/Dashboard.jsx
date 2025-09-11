import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Search,
  Filter,
  LayoutGrid,
  Rows,
  X,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  BadgeCheck,
  AlertTriangle,
  Crown,
  BadgeDollarSign,
} from "lucide-react";

const statusStyles = {
  Active: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
  Trial: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20",
  "Churn Risk": "bg-rose-500/15 text-rose-300 border border-rose-500/20",
};
const statusIcon = {
  Active: BadgeCheck,
  Trial: Crown,
  "Churn Risk": AlertTriangle,
};

const wrapperVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const MOCK = [
  {
    id: "c1",
    name: "Alice Johnson",
    email: "alice@pixelstudio.io",
    phone: "+1 (202) 555-0132",
    company: "Pixel Studio",
    avatar: "",
    status: "Active",
    plan: "Pro",
    mrr: 129,
    joinedAt: "2025-08-02",
    tags: ["Design", "High-value"],
  },
  {
    id: "c2",
    name: "Bob Chen",
    email: "bob@northwind.co",
    phone: "+1 (415) 555-0198",
    company: "Northwind Co",
    status: "Trial",
    plan: "Starter",
    mrr: 29,
    joinedAt: "2025-09-01",
    tags: ["SaaS"],
  },
  {
    id: "c3",
    name: "Charlie Smith",
    email: "charlie@acme.io",
    phone: "+44 20 7946 0958",
    company: "Acme Inc",
    status: "Churn Risk",
    plan: "Pro",
    mrr: 99,
    joinedAt: "2025-07-20",
    tags: ["Priority", "Support"],
  },
  {
    id: "c4",
    name: "Diana Lopez",
    email: "diana@finverse.com",
    phone: "+971 50 555 4421",
    company: "Finverse",
    status: "Active",
    plan: "Enterprise",
    mrr: 499,
    joinedAt: "2025-06-11",
    tags: ["Finance", "VIP"],
  },
];

export default function Clients() {
  const [clients, setClients] = useState(MOCK);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState("cards");
  const [openDetail, setOpenDetail] = useState(false);
  const [active, setActive] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((c) => {
      const byQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q);
      const byS = status === "All" || c.status === status;
      return byQ && byS;
    });
  }, [query, status, clients]);

  // ✅ yangi mijoz qo‘shish
  const handleAddClient = (form) => {
    const newClient = {
      ...form,
      id: "c" + (clients.length + 1),
      mrr: Number(form.mrr) || 0,
      joinedAt: new Date().toISOString().slice(0, 10),
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
    };
    setClients((prev) => [...prev, newClient]);
    setOpenAdd(false);
  };

  return (
    <motion.div
      variants={wrapperVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 md:p-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Clients</h1>
          <p className="text-slate-400 mt-1">
            Manage customers, plans, and MRR in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clients…"
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 placeholder:text-slate-500"
            />
          </div>

          {/* Status filter */}
          <div className="hidden md:flex gap-2">
            {["All", "Active", "Trial", "Churn Risk"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-sm border ${
                  status === s
                    ? "bg-indigo-600/20 border-indigo-600/30 text-indigo-200"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-700">
            <button
              onClick={() => setView("cards")}
              className={`px-3 py-2 flex items-center gap-2 ${
                view === "cards"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-3 py-2 flex items-center gap-2 ${
                view === "table"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Rows className="w-4 h-4" />
            </button>
          </div>

          {/* ➕ New Client button */}
          <button
            onClick={() => setOpenAdd(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-900/30 transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            New Client
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <CardsView
          data={filtered}
          onOpen={(c) => {
            setActive(c);
            setOpenDetail(true);
          }}
        />
      ) : (
        <TableView
          data={filtered}
          onOpen={(c) => {
            setActive(c);
            setOpenDetail(true);
          }}
        />
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {openDetail && active && (
          <DetailModal client={active} onClose={() => setOpenDetail(false)} />
        )}
      </AnimatePresence>

      {/* ➕ Add Client Modal */}
      <AnimatePresence>
        {openAdd && (
          <AddClientModal
            onClose={() => setOpenAdd(false)}
            onSave={handleAddClient}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Views & UI Components ---------- */
function CardsView({ data, onOpen }) {
  if (!data.length) return <EmptyState />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:shadow-lg transition"
        >
          <div className="flex items-center gap-4">
            <Avatar name={c.name} src={c.avatar} />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{c.name}</h3>
                <StatusBadge value={c.status} />
              </div>
              <p className="text-slate-400 text-sm">{c.company}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <InfoBox label="Plan" value={c.plan} />
            <InfoBox label="MRR" value={`$${c.mrr}/mo`} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(c.tags || []).slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => onOpen(c)}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
            >
              View
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TableView({ data, onOpen }) {
  if (!data.length) return <EmptyState />;
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/40">
      <table className="w-full">
        <thead className="bg-slate-900/70">
          <tr className="text-left text-slate-400 text-sm">
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">MRR</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr
              key={c.id}
              className="border-t border-slate-800/60 hover:bg-slate-900/40 transition"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} src={c.avatar} size="sm" />
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">{c.company}</td>
              <td className="px-4 py-3">{c.plan}</td>
              <td className="px-4 py-3">${c.mrr}/mo</td>
              <td className="px-4 py-3">
                <StatusBadge value={c.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpen(c)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Small UI Helpers ---------- */
const EmptyState = () => (
  <div className="text-slate-400 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
    No clients found
  </div>
);
const InfoBox = ({ label, value }) => (
  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
    <span className="text-slate-400 text-xs">{label}</span>
    <div className="font-medium">{value}</div>
  </div>
);
function Avatar({ name = "", src = "", size = "md" }) {
  const dim = size === "sm" ? "w-9 h-9" : "w-12 h-12";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return src ? (
    <img
      alt={name}
      src={src}
      className={`${dim} rounded-full object-cover border border-slate-700`}
    />
  ) : (
    <div
      className={`${dim} rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-semibold`}
    >
      {initials || "U"}
    </div>
  );
}
function StatusBadge({ value }) {
  const Icon = statusIcon[value] || BadgeCheck;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${
        statusStyles[value] ||
        "bg-slate-800 text-slate-300 border border-slate-700"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {value}
    </span>
  );
}

//* ---------- Detail Drawer ---------- */
function DetailModal({ client, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* drawer */}
      <motion.div
        className="relative z-10 w-full max-w-md h-full bg-slate-900 border-l border-slate-700 shadow-2xl p-6 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h3 className="text-lg font-semibold">{client.name}</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-slate-300 overflow-y-auto">
          <InfoBox label="Email" value={client.email} />
          <InfoBox label="Phone" value={client.phone || "—"} />
          <InfoBox label="Company" value={client.company} />
          <InfoBox label="Joined" value={client.joinedAt} />
          <InfoBox label="MRR" value={`$${client.mrr}/mo`} />
          <StatusBadge value={client.status} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Add Client Drawer ---------- */
function AddClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plan: "Starter",
    status: "Active",
    tags: "",
    mrr: 0,
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* drawer */}
      <motion.div
        className="relative z-10 w-full max-w-md h-full bg-slate-900 border-l border-slate-700 shadow-2xl p-6 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <h3 className="text-xl font-semibold mb-4">Add New Client</h3>

        <div className="flex-1 overflow-y-auto space-y-4 text-slate-300">
          {/* Inputs */}
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Plan (Starter / Pro / Enterprise)"
            value={form.plan}
            onChange={(e) => update("plan", e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Status (Active / Trial / Churn Risk)"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          />
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            placeholder="MRR ($/month)"
            value={form.mrr}
            onChange={(e) => update("mrr", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-800 border border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
