import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: "",
  },
  errors: {},
  mortgageDetails: {
    monthlyPayment: "",
    totalPayments: "",
    totalOverpayment: "",
    interestPaid: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
      state.errors[name] = ""; 
    },
    validateForm: (state) => {
      const errors = {};
      const { mortgageAmount, mortgageTerm, interestRate, mortgageType } =
        state.formData;

      if (!mortgageAmount) errors.mortgageAmount = "This field is required";
      if (!mortgageTerm) errors.mortgageTerm = "This field is required";
      if (!interestRate) errors.interestRate = "This field is required";
      if (!mortgageType) errors.mortgageType = "This field is required";

      state.errors = errors;
    },
    calculateMortgage: (state) => {
      const { mortgageAmount, mortgageTerm, interestRate } = state.formData;

      if (!mortgageAmount || !mortgageTerm || !interestRate) return;

      // Пример простой формулы для расчёта ипотеки
      const principal = parseFloat(mortgageAmount);
      const termInMonths = parseFloat(mortgageTerm) * 12;
      const monthlyRate = parseFloat(interestRate) / 100 / 12;

      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termInMonths));

      const totalPayments = monthlyPayment * termInMonths;
      const interestPaid = totalPayments - principal;
      const totalOverpayment = totalPayments - principal;

      state.mortgageDetails = {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayments: totalPayments.toFixed(2),
        totalOverpayment: totalOverpayment.toFixed(2),
        interestPaid: interestPaid.toFixed(2),
      };
    },
    clearForm: (state) => {
      state.formData = {
        mortgageAmount: "",
        mortgageTerm: "",
        interestRate: "",
        mortgageType: "",
      };
      state.errors = {};
      state.mortgageDetails = {
        monthlyPayment: "",
        totalPayments: "",
        totalOverpayment: "",
        interestPaid: "",
      };
    },
  },
});

export const { updateField, validateForm, calculateMortgage, clearForm } =
  formSlice.actions;

export default formSlice.reducer;
