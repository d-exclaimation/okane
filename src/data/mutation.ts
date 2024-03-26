import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { store } from "./db";
import { Record, Records } from "./types";
export function useNewRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["records", "new"],
    mutationFn: async ({ amount, kind }: Omit<Record, "id" | "createdAt">) => {
      const records = await store("record");
      const record = {
        id: uuid(),
        createdAt: new Date().toISOString(),
        amount,
        kind,
      } satisfies Record;
      await records.add(record);

      return record;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records", "all"] });
    },
  });
}

export function useClearDataMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["records", "new"],
    mutationFn: async () => {
      const records = await store("record");
      const raw = await records.getAll();
      const maybeAllRecords = await Records.safeParseAsync(raw);
      const allRecords = maybeAllRecords.success ? maybeAllRecords.data : [];

      for (const record of allRecords) {
        await records.delete(record.id);
      }

      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records", "all"] });
    },
  });
}
