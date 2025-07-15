export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid value provided for currency formatting')
  }

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
