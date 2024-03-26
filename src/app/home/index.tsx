import { Menu, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  ChevronDownIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { DailyBudget } from "../../data/types";
import { useSavedUp } from "../../hook/use-saved-up";
import { dollarsAndCents } from "../../utils/money";
import AmountShowcase from "./amount-showcase";
import Daily from "./daily";
import NewRecord from "./new-record";

const Home = () => {
  const { totalOfTheWeek, weekly, daily } = useSavedUp();
  const [showcase, setShowcase] = useState<"saved" | "spent">("saved");

  const [dollars, cents] = useMemo(() => {
    const value =
      showcase === "saved"
        ? weekly.length * DailyBudget - totalOfTheWeek
        : totalOfTheWeek;
    return dollarsAndCents(value);
  }, [totalOfTheWeek, showcase]);

  return (
    <>
      <div className="min-h-[45dvh] w-full flex flex-col items-center justify-center gap-3">
        <span className="absolute top-5 left-4 font-medium text-lg">
          👋 Welcome back
        </span>
        <NewRecord />

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center gap-1.5">
              <span className="text-lg text-gray-600">
                {showcase === "saved" ? "Saved" : "Spent"} this week
              </span>
              <ChevronDownIcon className="w-5 h-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -right-2 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      } flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setShowcase("saved")}
                    >
                      <BanknotesIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Saved
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-orange-600 text-white" : "text-gray-900"
                      } flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => setShowcase("spent")}
                    >
                      <FireIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      Spent
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <AmountShowcase
          dollars={dollars}
          cents={cents}
          colored={showcase === "saved"}
        />
      </div>
      {daily.map((data) => (
        <Daily key={data.date.toISOString()} {...data} />
      ))}
    </>
  );
};

export default Home;
