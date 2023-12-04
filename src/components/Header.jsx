import React from "react";
import { useSnapshot } from "valtio";
import { Link } from "react-router-dom";

import state from "../store";

const Header = () => {
  const snap = useSnapshot(state);
  return (
    <>
      <div className="max-w-[100vw] mx-[4.444vw] mt-[3vw] mb-4 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-3 md:gap-5 lg:gap-5">
            <img className="w-[30px] md:w-full" src="/images/logo.png" />
            <h2 className="text-[#626E7B] text-[12pt] md:text-[2.569vw] font-bold mt-4">
              PierreSteen.be
            </h2>
          </div>
        </Link>

        {snap.intro ? (
          <div className="text-end">
            <p className="text-[8pt] md:text-[1.231vw] font-bold">
              Satisfaction garantie
            </p>
            <p className="text-[8pt] md:text-[1.231vw] font-bold leading-[15pt]">
              Livraison nationale / Prix d’usine
            </p>
            <p className="text-[8pt] md:text-[1.231vw] font-bold">
              pour Particulier et Professionnel
            </p>
          </div>
        ) : (
          <div className="text-end mt-[1vw] md:mt-[0vw]">
            <p className="text-[9pt] md:text-[1.231vw] font-bold">
              Des questions ?
            </p>
            <p className="text-[9pt] md:text-[1.231vw] font-light leading-[15pt]">
              Appelez-nous au
            </p>
            <p className="text-[9pt] md:text-[1.231vw] font-bold">
              02 320 29 30
            </p>
          </div>
        )}
      </div>

      {snap.intro && (
        <div className="mx-[4.444vw] flex items-center justify-end">
          <div className="text-end">
            <p className="text-[9pt] md:text-[1.231vw] font-bold">
              Des questions ?
            </p>
            <p className="text-[9pt] md:text-[1.231vw] font-light leading-[15pt]">
              Appelez-nous au
            </p>
            <p className="text-[9pt] md:text-[1.231vw] font-bold">
              02 320 29 30
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
