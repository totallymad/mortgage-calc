import { useSelector } from "react-redux";
import empty from "../assets/empty.svg";
import { formatCurrency } from "../functions";

export default function Result() {
  const { mortgageDetails, formData } = useSelector((state) => state.form);

  return (
    <>
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
    </>
  );
}
