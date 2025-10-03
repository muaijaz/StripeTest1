const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

export function formatCurrency(amountInCents: number) {
  return formatter.format(amountInCents / 100);
}
