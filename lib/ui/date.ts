export function formatNavDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  // Use a fixed timezone so server-rendered output matches every client and avoids hydration mismatches.
  const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(d);
  const day = new Intl.DateTimeFormat("en-US", { day: "2-digit", timeZone: "UTC" }).format(d);
  return `${month} ${day}`;
}


