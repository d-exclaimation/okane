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
        })),
        R.sortBy((record) => -record.createdAt.getTime())
      ),
    [data]
  );

  const weekly = useMemo(
    () =>
      R.pipe(
        records,
        R.filter((record) => isWithinTheSameWeek(record.createdAt, new Date()))
      ),
    [records]
  );

  const totalOfTheWeek = useMemo(
    () =>
      R.pipe(
        weekly,
        R.reduce((acc, record) => acc + record.amount, 0)
      ),
    [records]
  );

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
        }),
        R.sortBy((record) => -record.date.getTime())
      ),
    [records]
  );

  return {
    totalOfTheWeek,
    weekly,
    daily,
    records,
  };
}
