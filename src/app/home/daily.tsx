import * as R from "remeda";
import { KindToEmojis, RecordWithDate } from "../../data/types";

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
  return (
    <div className="flex flex-col w-full items-center justify-center py-2 px-4">
      <div className="w-full flex items-center justify-between pb-1">
        <span className="text-3xl px-5 opacity-0">🌤️</span>
        <div className="w-full flex items-center justify-between py-2 border-b border-gray-200 text-gray-500">
          <span>
            {date.toLocaleString("en-NZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>$ {total.toFixed(2)}</span>
        </div>
      </div>
      {records.map(({ amount, id, kind }) => (
        <div key={id} className="w-full flex items-center justify-between">
          <span className="text-3xl p-5">{EMOJIS[kind]}</span>
          <div className="w-full flex items-center justify-between py-4 border-b border-gray-200 text-lg font-medium">
            <span>{kind}</span>
            <span>$ {amount.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Daily;
