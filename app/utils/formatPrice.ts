export function formatPrice(amount: number, perPerson = false): string {
  const formatted = `NT$${new Intl.NumberFormat('en-US').format(amount)}`

  return perPerson ? `${formatted} / 人` : formatted
}
