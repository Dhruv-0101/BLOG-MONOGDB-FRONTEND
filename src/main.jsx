import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
//!Create instance of client
const queryClient = new QueryClient();
//configure stripe
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    "pk_test_51O7iHlSAP8eyRYOVMSRmnh22wxkhX33MCA93aTN90g3LXaW2h7RYvnb3sM85JRRUxFTsLGXiexCqLo426Pu10thG000RTns3P6"
);

//stripe options
const options = {
  mode: "payment",
  currency: "usd",
  amount: 1099,
  appearance: {
    theme: "flat",
    variables: {
      colorPrimary: "#4f46e5",
      colorBackground: "#ffffff",
      colorText: "#0f172a",
      colorDanger: "#ef4444",
      fontFamily: "Outfit, Inter, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "12px",
    },
    rules: {
      ".Input": {
        border: "1px solid #e2e8f0",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input:focus": {
        border: "2px solid #4f46e5",
        boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.08)",
      },
      ".Label": {
        fontWeight: "700",
        fontSize: "13px",
        color: "#475569",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
