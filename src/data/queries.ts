import { useQuery } from "@tanstack/react-query";
import { store } from "./db";
import { Records } from "./types";
export function useAllRecordsQuery() {
  return useQuery({
    queryKey: ["records", "all"],
    queryFn: async () => {
      const record = await store("record");
      const raw = await record.getAll();
      const maybeRecords = await Records.safeParseAsync(raw);
      if (maybeRecords.success) {
        return maybeRecords.data;
      }

      return [];
    },
  });
}
