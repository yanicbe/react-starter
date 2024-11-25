import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import ErrorBoundary from "./page-components/error/error-boundary";
import RootWrapper from "./page-components/root/root-wrapper";
import Routes from "./routes";

// @slava - added an error handler
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <RootWrapper>
      <ErrorBoundary>
        <Toaster />
        <Routes />
      </ErrorBoundary>
    </RootWrapper>
  </BrowserRouter>
);
