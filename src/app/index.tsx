import { Link, Outlet, useLocation } from "react-router-dom";

import { tlsx } from "../utils/tlsx";

const App = () => {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex-1 w-full flex flex-col items-center justify-start">
        <Outlet />
      </div>
      <div className="sticky z-10 bottom-safe flex items-center justify-center gap-x-28 w-full bg-gray-100 mt-auto px-4 pt-4 pb-safe-offset-12">
        <Link to="/">
          <img
            className={tlsx("w-7 h-7 transition-all duration-500", {
              "opacity-40": pathname !== "/",
            })}
            src="/icons/wallet.svg"
          />
        </Link>

        <Link to="/settings">
          <img
            className={tlsx("w-7 h-7 transition-all duration-500", {
              "opacity-40": pathname !== "/settings",
            })}
            src="/icons/settings.svg"
          />
        </Link>
      </div>
    </div>
  );
};

export default App;
