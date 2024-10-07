import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "../src/Components/footer.jsx";
import "../src/Components/footer.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    {/* Footer component */}
    <Footer />
  </StrictMode>
);
