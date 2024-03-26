import * as R from "remeda";
import { DailyBudget, KindToEmojis, RecordWithDate } from "../../data/types";
import { tlsx } from "../../utils/tlsx";

const EMOJIS: Record<string, string> = KindToEmojis;
export type DailyProps = {
  date: Date;
  records: RecordWithDate[];
};

const Daily = ({ date, records }: DailyProps) => {
  const total = R.pipe(
    records,
    R.sumBy((x) => x.amount)
  );

  const saved = DailyBudget - total;

  return (
    <div className="flex flex-col w-full items-center justify-center py-2 px-4">
      <div className="w-full flex items-center justify-between pb-1">
        <span className="text-3xl px-5 opacity-0">🌤️</span>
        <div className="w-full flex items-center gap-4 py-2 border-b border-gray-200 text-gray-500">
          <span>
            {date.toLocaleString("en-NZ", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="ml-auto">$ {total.toFixed(2)}</span>
          <span
            className={tlsx("text-sm text-green-700", {
              "text-red-700": saved < 0,
            })}
          >
            {saved >= 0 ? "+" : "-"}
            {Math.abs(saved).toFixed(2)}
          </span>
        </div>
      </div>
      {records.map(({ amount, id, kind }) => {
        return (
          <div key={id} className="w-full flex items-center justify-between">
            <span className="text-3xl p-5">{EMOJIS[kind]}</span>
            <div className="w-full flex items-center gap-4 py-4 border-b border-gray-200 text-lg font-medium">
              <span>{kind}</span>
              <span className="ml-auto">${amount.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Daily;
