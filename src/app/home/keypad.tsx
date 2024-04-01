import { useState } from "react";
import { tlsx } from "../../utils/tlsx";

type Key = {
  label: string;
  num: number;
};

const NUMBERS: Key[] = [
  { label: "1", num: 1 },
  { label: "2", num: 2 },
  { label: "3", num: 3 },
  { label: "4", num: 4 },
  { label: "5", num: 5 },
  { label: "6", num: 6 },
  { label: "7", num: 7 },
  { label: "8", num: 8 },
  { label: "9", num: 9 },
];

type KeypadProps = {
  value: number;
  setValue: (value: number) => void;
};

const Keypad = ({ value, setValue }: KeypadProps) => {
  const [isDollar, setDollar] = useState(true);

  const addDollars = (dollar: number) => {
    const dollars = Math.floor(value);
    const cents = (value - dollars) * 100;
    const moved = dollars * 10;
    const updatedValue = moved + dollar + cents / 100;
    setValue(updatedValue);
  };

  const addCents = (cent: number) => {
    const dollars = Math.floor(value);
    const cents = (value - dollars) * 100;
    const digits = cents.toString().padStart(2, "0").split("");
    const index = digits.findIndex((d) => d === "0");
    if (index === -1) {
      digits[0] = cent.toString();
      digits[1] = "0";
    } else {
      digits[index] = cent.toString();
    }
    const updatedValue = dollars + Number(digits.join("")) / 100;
    setValue(updatedValue);
  };

  return (
    <div className="grid grid-cols-3 w-full gap-2 [column-gap:0.5rem] mt-4">
      {NUMBERS.map(({ label, num }) => (
        <button
          key={num}
          className="w-full h-full [aspect-ratio:5/4] flex items-center justify-center border rounded-lg text-2xl transition-all duration-300 active:bg-neutral-100"
          onClick={() => (isDollar ? addDollars : addCents)(num)}
        >
          {label}
        </button>
      ))}
      <button
        className="w-full h-full [aspect-ratio:5/4] flex items-center justify-center border rounded-lg text-2xl text-red-600 transition-all duration-300 active:bg-neutral-100"
        onClick={() => setValue(0)}
      >
        C
      </button>

      <button
        className="w-full h-full [aspect-ratio:5/4] flex items-center justify-center border rounded-lg text-2xl transition-all duration-300 active:bg-neutral-100"
        onClick={() => (isDollar ? addDollars : addCents)(0)}
      >
        0
      </button>
      <button
        className={tlsx(
          "w-full h-full [aspect-ratio:5/4] flex items-center justify-center border rounded-lg text-2xl transition-all duration-300 active:bg-neutral-100",
          { "text-emerald-600": isDollar },
          { "text-amber-600": !isDollar }
        )}
        onClick={() => setDollar((prev) => !prev)}
      >
        {isDollar ? "$" : "¢"}
      </button>
    </div>
  );
};

export default Keypad;
