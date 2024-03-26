import { PlusIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import { useNewRecordMutation } from "../../data/mutation";
import { KindToEmojis } from "../../data/types";
import AmountShowcase from "./amount-showcase";
import Keypad from "./keypad";
import KindSelector from "./kind-selector";

type Kind = keyof typeof KindToEmojis;

const NewRecord = () => {
  const { mutateAsync } = useNewRecordMutation();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [kind, setKind] = useState<Kind>("Food");

  const [dollars, cents] = useMemo(() => {
    const dollars = Math.floor(amount);
    const cents = Math.round((amount - Math.floor(amount)) * 100);

    console.log({ dollars, cents, value: amount });

    return [dollars, cents] as const;
  }, [amount]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full bg-black select-none outline-none">
          <PlusIcon className="text-white w-5 h-5" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Drawer.Content className="z-30 bg-white flex flex-col rounded-t-[10px] mt-24 pb-6 fixed bottom-safe-offset-4 left-0 right-0 outline-none">
          <div className="py-4 px-6 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />

            <AmountShowcase
              className="w-full items-center justify-center pt-4 pb-10 min-h-[8rem]"
              dollars={dollars}
              cents={cents}
            />

            <KindSelector kind={kind} setKind={setKind} />

            <Keypad value={amount} setValue={setAmount} />

            <div className="w-full flex items-center justify-between mt-4 gap-12">
              <button
                className="bg-red-500 flex-1 py-2.5 rounded-md text-white text-lg active:bg-red-600"
                onClick={() => setAmount(0)}
              >
                Clear
              </button>
              <button
                className="bg-black flex-1 py-2.5 rounded-md text-white text-lg active:bg-neutral-800"
                onClick={async () => {
                  await mutateAsync({ kind, amount });
                  setOpen(false);
                  setKind("Food");
                  setAmount(0);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default NewRecord;
