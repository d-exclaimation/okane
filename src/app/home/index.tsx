import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useSavedUp } from "../../hook/use-saved-up";
import AmountShowcase from "./amount-showcase";
import Daily from "./daily";
import NewRecord from "./new-record";

const Home = () => {
  const { totalOfTheWeek, daily } = useSavedUp();

  return (
    <>
      <div className="min-h-[45dvh] w-full flex flex-col items-center justify-center gap-3">
        <span className="absolute top-5 left-4 font-medium text-lg">
          👋 Welcome back
        </span>
        <NewRecord />

        <div className="flex items-center gap-1.5">
          <span className="text-lg text-gray-600">Saved this week</span>
          <ChevronDownIcon className="w-5 h-5" />
        </div>

        <AmountShowcase
          dollars={totalOfTheWeek.dollar}
          cents={totalOfTheWeek.cents}
        />
      </div>
      {daily.map((data) => (
        <Daily key={data.date.toISOString()} {...data} />
      ))}
    </>
  );
};

export default Home;
