import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 border ${className}`}>
      {children}
    </div>
  );
}


type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}
