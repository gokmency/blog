export function formatNavDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.toLocaleString("en-US", { day: "2-digit" });
  return `${month} ${day}`;
}


