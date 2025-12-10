import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GroupContextProvider } from "./Context/GroupContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GroupContextProvider>
    <App />
  </GroupContextProvider>
);
