// src/components/SuspenseWrapper.tsx
import { ReactNode, Suspense } from "react";

// blue loading
export const BlueLoadingFallback = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  </div>
);

// green loading
export const GreenLoadingFallback = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  </div>
);

interface SuspenseWrapperProps {
  children?: ReactNode;
  fallback?: ReactNode;
  type?: "blue" | "green";
  text?: string;
}

/**
 * A reusable Suspense component with a default loading fallback
 */
export const SuspenseWrapper = ({ children, fallback, type = "blue", text = "Loading..." }: SuspenseWrapperProps) => {
  const LoadingFallback = type === "blue" ? BlueLoadingFallback : GreenLoadingFallback;
  return <Suspense fallback={fallback || <LoadingFallback text={text} />}>{children ?? <></>}</Suspense>;
};
