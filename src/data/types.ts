import { z } from "zod";
export const KindToEmojis = {
  Food: "🍱",
  Transport: "🚕",
  Entertainment: "🎉",
  Groceries: "🛒",
  Health: "🏥",
  Clothing: "👕",
  Gifts: "🎁",
  Bills: "💸",
  Misc: "🤷‍♂️",
};

export const DailyBudget = 50;

export type Record = z.infer<typeof Record>;
export const Record = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  amount: z.number().positive(),
  kind: z.string(),
});

export type RecordWithDate = Omit<Record, "createdAt"> & { createdAt: Date };

export type Records = z.infer<typeof Records>;
export const Records = z.array(Record);
