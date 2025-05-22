import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import Routes from "./routes";
import ErrorBoundary from "./util-components/error/error-boundary";
import RootWrapper from "./util-components/root/root-wrapper";

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
