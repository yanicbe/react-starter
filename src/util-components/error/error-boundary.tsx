import { Button } from "@/ui-components/ui/button";
import { H2 } from "@/ui-components/ui/headings";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <div className="w-1/2 m-auto h-full flex flex-col justify-center gap-8">
            <H2 className="mt-60">
              Es ist leider ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie den
              Support.
            </H2>
            <Button onClick={this.handleReload} className="flex gap-2 p-2 text-white">
              <div className="flex items-center justify-center">
                <ReloadIcon />
              </div>
              <span>Seite neu laden</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
