import { useMemo } from "react";
import * as R from "remeda";
import { useAllRecordsQuery } from "../data/queries";
import { isWithinTheSameWeek } from "../utils/date";

export function useSavedUp() {
  const { data } = useAllRecordsQuery();

  const records = useMemo(
    () =>
      R.pipe(
        data ?? [],
        R.map((record) => ({
          ...record,
          createdAt: new Date(record.createdAt),
        }))
      ),
    [data]
  );

  const totalOfTheWeek = useMemo(() => {
    const total = R.pipe(
      records,
      R.filter((record) => isWithinTheSameWeek(record.createdAt, new Date())),
      R.reduce((acc, record) => acc + record.amount, 0)
    );

    return {
      total,
      dollar: Math.floor(total),
      cents: Math.round((total - Math.floor(total)) * 100),
    };
  }, [records]);

  const daily = useMemo(
    () =>
      R.pipe(
        records,
        R.groupBy((record) => record.createdAt.getDate()),
        R.values,
        R.map((records) => {
          return {
            date: records[0].createdAt,
            records: R.sortBy(records, (record) => -record.createdAt.getTime()),
          };
        })
      ),
    [records]
  );

  return {
    totalOfTheWeek,
    daily,
    records,
  };
}
