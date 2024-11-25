import * as React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadElement> {}
const H1 = React.forwardRef<HTMLHeadElement, HeadingProps>(
  ({ ...props }, ref) => {
    return (
      <h1 {...props} className={`text-5xl font-extrabold ${props.className}`}>
        {props.children}
      </h1>
    );
  }
);
H1.displayName = 'H1';

const H2 = React.forwardRef<HTMLHeadElement, HeadingProps>(
  ({ ...props }, ref) => {
    return (
      <h2 {...props} className={`text-4xl font-bold ${props.className}`}>
        {props.children}
      </h2>
    );
  }
);
H2.displayName = 'H2';

const H3 = React.forwardRef<HTMLHeadElement, HeadingProps>(
  ({ ...props }, ref) => {
    return (
      <h3 {...props} className={`text-3xl font-bold ${props.className}`}>
        {props.children}
      </h3>
    );
  }
);
H3.displayName = 'H3';

const H4 = React.forwardRef<HTMLHeadElement, HeadingProps>(
  ({ ...props }, ref) => {
    return (
      <h4 {...props} className={`text-2xl font-bold ${props.className}`}>
        {props.children}
      </h4>
    );
  }
);
H4.displayName = 'H4';

const H5 = React.forwardRef<HTMLHeadElement, HeadingProps>(
  ({ ...props }, ref) => {
    return (
      <h5 {...props} className={`text-xl font-bold ${props.className}`}>
        {props.children}
      </h5>
    );
  }
);
H5.displayName = 'H5';

const H6 = React.forwardRef<HTMLHeadElement, HeadingProps>(
  ({ ...props }, ref) => {
    return (
      <h6 {...props} className={`text-lg font-bold ${props.className}`}>
        {props.children}
      </h6>
    );
  }
);
H6.displayName = 'H6';

export { H1, H2, H3, H4, H5, H6 };
