export function rupeesToPaise(n: number): number {
  return Math.round(n * 100);
}

export function splitEvenPaise(totalPaise: number, n: number): number[] {
  if (n <= 0) return [];
  const base = Math.floor(totalPaise / n);
  const rem = totalPaise - base * n;
  return Array.from({ length: n }, (_, i) => base + (i < rem ? 1 : 0));
}

export function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/[₹,\s]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

export function formatINRFromPaise(paise: number): string {
  const rupees = paise / 100;
  const hasPaise = paise % 100 !== 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}

export function formatINRSigned(paise: number): string {
  if (paise === 0) return formatINRFromPaise(0);
  const sign = paise > 0 ? "+" : "−";
  return `${sign}${formatINRFromPaise(Math.abs(paise))}`;
}

export function todayISODate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDay(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(y, m - 1, d));
}

export function formatDayLong(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}
