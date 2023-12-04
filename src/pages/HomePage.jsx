import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { Link } from "react-router-dom";

import state from "../store";
import Login from "../components/Login";

const HomePage = () => {
  const snap = useSnapshot(state);
  useEffect(() => {
    state.intro = false;
  }, []);
  return (
    <>
      <div className="tile_type max-w-[100vw] mt-[60px] md:mt-[150px]">
        <div className="md:mx-[8rem]">
          <div className="main mx-auto">
            {snap.showLogin && <Login />}
            <div className="content flex flex-col lg:flex-row md:flex-row items-center justify-between">
              <div className="text ">
                <h1 className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] leading-[27pt] md:leading-[32pt] font-bold">
                  Quel usage de la
                </h1>
                <p className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] font-bold">
                  Pierre Naturelle
                </p>
                <p className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] leading-[27pt] md:leading-[32pt] font-bold">
                  souhaitez-vous
                </p>
                <p className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] font-bold">
                  en faire ?
                </p>
              </div>
              <button
                onClick={() => (state.showLogin = true)}
                className="mt-[30px] text-[13pt] md:text-[1.458vw] lg:text-[1.458vw] font-bold text-[#C1272D] border-2 border-[#C1272D] py-1 px-5 rounded-[70px] hover:text-white hover:bg-[#C1272D] "
              >
                Demander un devis
              </button>
            </div>
            <div className="tiles mx-[0px] md:mx-[50px] mt-[80px] md:mt-[120px] grid grid-cols-1 gap-x-4 gap-y-20 md:grid-cols-3 lg:grid-cols-4 mb-[120px]">
              <Link to="/tile_design">
                <div className="tile text-center">
                  <img className="mx-auto" src="/images/tile_type.png" />
                  <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                    Tablette/Seuil de Fenetre
                  </p>
                </div>
              </Link>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Soubassements de Façade
                </p>
              </div>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Revetements Inter./Exter.
                </p>
              </div>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Dalles Carreaux
                </p>
              </div>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Plan de Travail et Credence
                </p>
              </div>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Plinthes Bordures
                </p>
              </div>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Cheminées et Décoration
                </p>
              </div>
              <div className="tile text-center">
                <img className="mx-auto" src="/images/tile_type.png" />
                <p className="text-[#C1272D] font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Parements Colonnes
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact relative overflow-hidden py-20 mb-10">
          <div className="bg-tilted"></div>
          <div className="content text-center">
            <h2 className="font-bold text-white text-[16pt] md:text-[3.611vw] mb-7">
              Une demande personnalisée ?
            </h2>
            <p className="font-bold text-white text-[12pt] md:text-[2.431vw]">
              Demandez un devis immédiat
            </p>
            <p className="font-bold text-white text-[12pt] md:text-[2.431vw] md:leading-[30pt]">
              via WhatsApp
            </p>
          </div>
        </div>

        <div className="footer-logo">
          <div className="flex items-center justify-center gap-3 md:gap-5 lg:gap-5 my-20">
            <img className="" src="/images/logo.png" />
            <h2 className="text-[#626E7B] text-[13pt] md:text-[2.569vw] font-bold mt-4">
              PierreSteen.be
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
