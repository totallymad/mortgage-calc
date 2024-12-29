import { configureStore } from "@reduxjs/toolkit";
import Form from "./components/Form";
import Result from "./components/Result";
import formReducer from "./store/formSlice.js";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50 md:flex md:min-h-96 shadow-2xl md:rounded-2xl md:mx-auto  lg:w-[1000px]">
        <Form />
        <Result />
      </div>
    </Provider>
  );
}

export default App;
