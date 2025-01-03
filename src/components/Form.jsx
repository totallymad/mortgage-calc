import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  validateForm,
  calculateMortgage,
  clearForm,
} from "../store/formSlice";

export default function Form() {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dispatch(validateForm())) {
      dispatch(calculateMortgage());
    }
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  return (
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
            className={`border border-l-[50px] text-xl h-14 font-bold rounded-lg bg-transparent  p-3 focus:border-lime focus:outline-none ${
              errors.mortgageAmount ? "border-red" : "border-slate-500/50"
            }`}
            type="number"
            name="mortgageAmount"
            id="amount"
            value={formData.mortgageAmount}
            onChange={handleChange}
            onPaste={handlePaste}
          />
          <div
            className={`flex justify-center items-center absolute left-0 top-9 rounded-tl-lg z-1 rounded-bl-lg w-12 h-14 text-2xl font-bold focus:bg-lime ${
              errors.mortgageAmount ? "text-slate-100" : "text-slate-700"
            }`}
          >
            £
          </div>

          {errors.mortgageAmount && (
            <p className="text-red">{errors.mortgageAmount}</p>
          )}
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-3">
          <div className="flex flex-col gap-3 mb-6 relative">
            <label htmlFor="term" className="text-slate-500">
              Mortgage Term
            </label>
            <input
              className={`border border-r-[96px] text-xl h-14 font-bold rounded-lg bg-transparent p-3 focus:border-lime focus:outline-none ${
                errors.mortgageTerm ? "border-red" : "border-slate-500/50"
              }`}
              type="number"
              name="mortgageTerm"
              id="term"
              value={formData.mortgageTerm}
              onChange={handleChange}
              onPaste={handlePaste}
            />
            <div
              className={`flex justify-center items-center absolute right-0 top-9 rounded-tr-lg z-1 rounded-br-lg  w-24 h-14 text-2xl font-bold md:text-xl md:w-18 ${
                errors.mortgageTerm ? "text-slate-100" : "text-slate-700"
              }`}
            >
              years
            </div>

            {errors.mortgageTerm && (
              <p className="text-red">{errors.mortgageTerm}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 mb-6 relative">
            <label htmlFor="rate" className="text-slate-500">
              Interest Rate
            </label>
            <input
              className={`border border-r-[56px] text-xl h-14 font-bold rounded-lg bg-transparent  p-3 focus:border-lime focus:outline-none ${
                errors.interestRate ? "border-red" : "border-slate-500/50"
              }`}
              type="number"
              name="interestRate"
              id="rate"
              value={formData.interestRate}
              onChange={handleChange}
              onPaste={handlePaste}
            />
            <div
              className={`flex justify-center items-center absolute right-0 top-9 rounded-tr-lg z-1 rounded-br-lg  w-14 h-14 text-2xl font-bold ${
                errors.interestRate ? "text-slate-100" : "text-slate-700"
              }`}
            >
              %
            </div>
            {errors.interestRate && (
              <p className="text-red">{errors.interestRate}</p>
            )}
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
          {errors.mortgageType && (
            <p className="text-red mb-3">{errors.mortgageType}</p>
          )}
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
  );
}
