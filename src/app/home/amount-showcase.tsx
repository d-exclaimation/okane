import { ComponentPropsWithoutRef } from "react";
import { tlsx } from "../../utils/tlsx";

type AmountShowcase = ComponentPropsWithoutRef<"div"> & {
  dollars: number;
  cents: number;
  colored?: boolean;
};

const AmountShowcase = ({
  dollars,
  cents,
  colored,
  className,
  ...rest
}: AmountShowcase) => {
  return (
    <div className={tlsx("flex gap-1 min-h-[4.5rem]", className)} {...rest}>
      {dollars < 0 && <span className="text-4xl text-gray-700">-</span>}
      <span className="text-4xl text-gray-700">$</span>
      <h1
        className={tlsx(
          "text-7xl font-medium",
          { "text-6xl": dollars >= 2_000 },
          { "text-5xl": dollars >= 20_000 },
          { "text-4xl": dollars >= 200_000 },
          { "text-3xl": dollars >= 2_000_000 },
          { "text-green-600": dollars > 0 && colored },
          { "text-red-600": dollars < 0 && colored }
        )}
      >
        {Math.abs(dollars)}
      </h1>
      <span
        className={tlsx(
          "text-4xl font-medium",
          { "text-3xl": dollars >= 2_000_000 },
          { "text-green-600": dollars > 0 && colored },
          { "text-red-600": dollars < 0 && colored }
        )}
      >
        .{cents.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default AmountShowcase;
