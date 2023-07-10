import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./scss/app.scss";

const rootElementDiv = document.getElementById("root")!;
const root = createRoot(rootElementDiv);

root.render(<App />);
