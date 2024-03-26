import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { KindToEmojis } from "../../data/types";

type Kind = keyof typeof KindToEmojis;
const KINDS = Object.keys(KindToEmojis) as Kind[];

type KindSelectorProps = {
  kind: Kind;
  setKind: (kind: Kind) => void;
};

const KindSelector = ({ kind, setKind }: KindSelectorProps) => {
  const [query, setQuery] = useState("");

  const filteredKinds =
    query === ""
      ? KINDS
      : KINDS.filter((kind) =>
          kind
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <Combobox value={kind} onChange={setKind}>
      <div className="relative">
        <div className="relative flex items-center w-full cursor-default overflow-hidden bg-white text-left border-b">
          <span key={kind} className="animate-in slide-in-from-top">
            {KindToEmojis[kind]}
          </span>
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 leading-5 font-semibold outline-none"
            displayValue={(kind: Kind) => kind}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-neutral-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredKinds.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredKinds.map((kind) => (
                <Combobox.Option
                  key={kind}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-300 text-black" : "text-black"
                    }`
                  }
                  value={kind}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {KindToEmojis[kind]} {kind}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-black" : "text-orange-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default KindSelector;
