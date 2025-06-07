export function FormatCurrency(value: number) {
  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
  return formatted.replace("₫", "VNĐ");
}
