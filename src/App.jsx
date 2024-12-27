import { useState } from "react";

import { calculateMortgageDetails, formatCurrency } from "./functions";

import empty from "./assets/empty.svg";

function App() {
  const [formData, setFormData] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "", // 'repayment' или 'interest-only'
  });

  const [mortgageDetails, setMortgageDetails] = useState({
    monthlyPayment: "",
    totalPayments: "",
    totalOverpayment: "",
    interestPaid: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Получаем данные из состояния формы
    const mortgageDetails = calculateMortgageDetails(
      formData.mortgageAmount,
      formData.mortgageTerm,
      formData.interestRate
    );

    // Обновляем состояние для отображения данных ниже формы
    setMortgageDetails(mortgageDetails);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    // Очистка формы
    setFormData({
      mortgageAmount: "",
      mortgageTerm: "",
      interestRate: "",
      mortgageType: "",
    });
  };

  const handlePaste = (event) => {
    event.preventDefault(); // Запрещает вставку
  };

  return (
    <>
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Mortgage Calculator
        </h1>
        <button
          onClick={handleClear}
          className="mt-3 mb-4 border-b-2 text-slate-500"
        >
          Clear All
        </button>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="amount" className="text-slate-500">
              Mortgage Amount
            </label>
            <input
              className="border rounded-lg border-slate-500 p-3"
              type="number"
              name="mortgageAmount"
              id="amount"
              value={formData.mortgageAmount}
              onChange={handleChange}
              onPaste={handlePaste}
            />
          </div>
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="term">Mortgage Term</label>
            <input
              className="border rounded-lg border-slate-500 p-3"
              type="number"
              name="mortgageTerm"
              id="term"
              value={formData.mortgageTerm}
              onChange={handleChange}
              onPaste={handlePaste}
            />
          </div>
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="rate">Interest Rate</label>
            <input
              className="border rounded-lg border-slate-500 p-3"
              type="number"
              name="interestRate"
              id="rate"
              value={formData.interestRate}
              onChange={handleChange}
              onPaste={handlePaste}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="repayment"
                name="mortgageType"
                value="repayment"
                checked={formData.mortgageType === "repayment"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="repayment"
                className="text-sm font-medium text-gray-700"
              >
                Repayment
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="interest-only"
                name="mortgageType"
                value="interest-only"
                checked={formData.mortgageType === "interest-only"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="interest-only"
                className="text-sm font-medium text-gray-700"
              >
                Interest Only
              </label>
            </div>
          </div>
          <button
            className="w-full items-center justify-center bg-lime flex rounded-full border px-4 py-3 gap-3"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#133041"
                d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
              />
            </svg>
            <span className="text-xl text-slate-900 font-bold">
              Calculate Repayments
            </span>
          </button>
        </form>
      </div>
      {!mortgageDetails.monthlyPayment && (
        <div className="py-6 px-6 bg-slate-900/90 flex flex-col items-center">
          <img width={180} src={empty} alt="Нет расчётов" />
          <h3 className="text-2xl font-bold text-white mb-5">
            Results shown here
          </h3>
          <p className="text-center text-slate-100/70">
            Complete the form an click &quot;calculate repayments&quot; to see
            what your monthly rpeayments would be.
          </p>
        </div>
      )}
      {mortgageDetails.monthlyPayment &&
        formData.mortgageType === "repayment" && (
          <div className="py-6 px-6 bg-slate-900/90">
            <h2 className="text-slate-100 text-xl">Your results</h2>
            <p className="text-slate-100/60 mt-3">
              Your results are shown below based on the infromation you
              provided. To adjust the results, edit the form and click
              &quot;calculate repayments&quot; again.
            </p>
            <div className="mt-6 bg-slate-900 p-3 border-t-2 rounded-xl border-lime">
              <p className="text-slate-100/60">Your monthly repayments</p>
              <p className="text-lime">
                {formatCurrency(mortgageDetails.monthlyPayment)}
              </p>
              <p className="text-slate-100/60">
                Total you&apos;ll repay over the term
              </p>
              <p className="text-slate-100">
                {formatCurrency(mortgageDetails.totalPayments)}
              </p>
            </div>
          </div>
        )}
      {mortgageDetails.monthlyPayment &&
        formData.mortgageType === "interest-only" && (
          <div className="mt-6">
            <h2>Mortgage Calculation Results</h2>
            <p>Interest Paid: {mortgageDetails.interestPaid} руб.</p>
          </div>
        )}
    </>
  );
}

export default App;
