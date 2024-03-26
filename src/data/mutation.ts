import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { store } from "./db";
import { Record } from "./types";
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
