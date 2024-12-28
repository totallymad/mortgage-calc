export const calculateMortgageDetails = (amount, term, rate) => {
  const principal = parseFloat(amount);
  const years = parseFloat(term);
  const annualRate = parseFloat(rate) / 100;
  const monthlyRate = annualRate / 12;
  const months = years * 12;

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  const totalPayments = monthlyPayment * months; // Общая сумма выплат
  const totalOverpayment = totalPayments - principal; // Переплата
  const interestPaid = totalPayments - principal; // Проценты

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayments: totalPayments.toFixed(2),
    totalOverpayment: totalOverpayment.toFixed(2),
    interestPaid: interestPaid.toFixed(2),
  };
};

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}
