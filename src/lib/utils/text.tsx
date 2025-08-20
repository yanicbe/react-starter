import * as React from "react";

/**
 * Formats text by replacing newline characters with <br /> elements
 * @param text The text to format
 * @returns React nodes with line breaks
 */
export const formatTextWithLineBreaks = (text: string): React.ReactNode[] => {
  if (!text) return [];

  return text.split("\n").map((line, index, array) => {
    const isLastLine = index === array.length - 1;
    return (
      <React.Fragment key={index}>
        {line}
        {!isLastLine && <br />}
      </React.Fragment>
    );
  });
};
