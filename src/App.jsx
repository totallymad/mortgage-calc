import { useState } from "react";

import { calculateMortgageDetails, formatCurrency } from "./functions";

import empty from "./assets/empty.svg";

function App() {
  const [formData, setFormData] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
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

    setMortgageDetails({
      monthlyPayment: "",
      totalPayments: "",
      totalOverpayment: "",
      interestPaid: "",
    });
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex md:min-h-96 shadow-2xl md:rounded-2xl md:mx-auto  lg:w-[1000px]">
      <div className="px-6 py-8 lg:w-[500px]">
        <div className="lg:flex lg:justify-between">
          <h1 className="text-3xl font-bold text-slate-900">
            Mortgage Calculator
          </h1>
          <button
            onClick={handleClear}
            className="mt-3 mb-4 border-b-2 text-slate-500 hover:text-slate-900 transition-all hover:border-b-slate-900"
          >
            Clear All
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-6 relative">
            <label htmlFor="amount" className="text-slate-500">
              Mortgage Amount
            </label>
            <input
              className="border border-l-[50px] text-xl h-14 font-bold rounded-lg bg-transparent border-slate-500/50 p-3 focus:border-lime focus:outline-none "
              type="number"
              name="mortgageAmount"
              id="amount"
              value={formData.mortgageAmount}
              onChange={handleChange}
              onPaste={handlePaste}
              required
            />
            <div className="flex justify-center items-center absolute left-0 top-9 rounded-tl-lg z-1 rounded-bl-lg  w-12 h-14 text-slate-700 text-2xl font-bold focus:bg-lime">
              £
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-3">
            <div className="flex flex-col gap-3 mb-6 relative">
              <label htmlFor="term" className="text-slate-500">
                Mortgage Term
              </label>
              <input
                className="border border-r-[96px] text-xl h-14 font-bold rounded-lg bg-transparent border-slate-500/50 p-3 focus:border-lime focus:outline-none "
                type="number"
                name="mortgageTerm"
                id="term"
                value={formData.mortgageTerm}
                onChange={handleChange}
                onPaste={handlePaste}
                required
              />
              <div className="flex justify-center items-center absolute right-0 top-9 rounded-tr-lg z-1 rounded-br-lg  w-24 h-14 text-slate-700 text-2xl font-bold md:text-xl md:w-18">
                years
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-6 relative">
              <label htmlFor="rate" className="text-slate-500">
                Interest Rate
              </label>
              <input
                className="border border-r-[56px] text-xl h-14 font-bold rounded-lg bg-transparent border-slate-500/50 p-3 focus:border-lime focus:outline-none "
                type="number"
                name="interestRate"
                id="rate"
                value={formData.interestRate}
                onChange={handleChange}
                onPaste={handlePaste}
                required
              />
              <div className="flex justify-center items-center absolute right-0 top-9 rounded-tr-lg z-1 rounded-br-lg  w-14 h-14 text-slate-700 text-2xl font-bold">
                %
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-500">Mortgage Type</span>
            <div
              className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer mb-3 mt-3 transition ${
                formData.mortgageType === "repayment"
                  ? "bg-lime/30 border-lime"
                  : "border-slate-500"
              }`}
              onClick={() =>
                handleChange({
                  target: { name: "mortgageType", value: "repayment" },
                })
              }
            >
              <input
                type="radio"
                id="repayment"
                name="mortgageType"
                value="repayment"
                checked={formData.mortgageType === "repayment"}
                onChange={handleChange}
                className="hidden"
                required
              />
              <div
                className={`h-5 w-5 flex items-center justify-center border-2 rounded-full transition ${
                  formData.mortgageType === "repayment"
                    ? "border-lime bg-slate-50"
                    : "border-slate-500"
                }`}
              >
                {formData.mortgageType === "repayment" && (
                  <div className="h-2.5 w-2.5 bg-lime rounded-full transition"></div>
                )}
              </div>
              <label
                htmlFor="repayment"
                className="text-xl font-bold text-slate-900 pl-2 cursor-pointer"
              >
                Repayment
              </label>
            </div>

            <div
              className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer mb-6 transition ${
                formData.mortgageType === "interest-only"
                  ? "bg-lime/30 border-lime"
                  : "border-slate-500"
              }`}
              onClick={() =>
                handleChange({
                  target: { name: "mortgageType", value: "interest-only" },
                })
              }
            >
              <input
                type="radio"
                id="interest-only"
                name="mortgageType"
                value="interest-only"
                checked={formData.mortgageType === "interest-only"}
                onChange={handleChange}
                className="hidden"
                required
              />
              <div
                className={`h-5 w-5 flex items-center justify-center border-2 rounded-full transition ${
                  formData.mortgageType === "interest-only"
                    ? "border-lime bg-slate-50"
                    : "border-slate-500"
                }`}
              >
                {formData.mortgageType === "interest-only" && (
                  <div className="h-2.5 w-2.5 bg-lime rounded-full transition"></div>
                )}
              </div>
              <label
                htmlFor="interest-only"
                className="text-xl font-bold text-slate-900 pl-2 cursor-pointer"
              >
                Interest Only
              </label>
            </div>
          </div>

          <button
            className="w-full items-center justify-center bg-lime flex rounded-full border px-4 py-3 gap-3 md:w-80"
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
        <div className=" md:rounded-bl-[100px] py-6 px-6 bg-slate-900/90 flex flex-col items-center md:rounded-br-xl md:rounded-tr-xl lg:w-[500px] md:justify-center">
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
          <div className="py-6 px-6 bg-slate-900/90 md:rounded-bl-[100px] md:rounded-br-xl md:rounded-tr-xl lg:w-[500px]">
            <h2 className="text-slate-100 text-xl font-bold">Your results</h2>
            <p className="text-slate-100/60 mt-3">
              Your results are shown below based on the infromation you
              provided. To adjust the results, edit the form and click
              &quot;calculate repayments&quot; again.
            </p>
            <div className="mt-6 bg-slate-900 p-3 border-t-2 rounded-xl border-lime">
              <p className="text-slate-100/60 mb-3">Your monthly repayments</p>
              <p className="text-lime text-3xl md:text-5xl font-bold mb-3 pb-3 border-b border-slate-700">
                {formatCurrency(mortgageDetails.monthlyPayment)}
              </p>
              <p className="text-slate-100/60 mb-3">
                Total you&apos;ll repay over the term
              </p>
              <p className="text-slate-100 text-2xl font-bold">
                {formatCurrency(mortgageDetails.totalPayments)}
              </p>
            </div>
          </div>
        )}
      {mortgageDetails.monthlyPayment &&
        formData.mortgageType === "interest-only" && (
          <div className="py-6 px-6 bg-slate-900/90 md:rounded-bl-[100px] md:rounded-br-xl md:rounded-tr-xl lg:w-[500px]">
            <div>
              <h2 className="text-slate-100 text-xl font-bold">Your results</h2>
              <p className="text-slate-100/60 mt-3">
                Your results are shown below based on the infromation you
                provided. To adjust the results, edit the form and click
                &quot;calculate repayments&quot; again.
              </p>
            </div>
            <div className="mt-6 bg-slate-900 p-3 border-t-2 rounded-xl border-lime">
              <p className="text-slate-100/60 mb-3">Your interest payment</p>
              <p className="text-lime text-3xl md:text-5xl font-bold mb-3">
                {formatCurrency(mortgageDetails.interestPaid)}
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
