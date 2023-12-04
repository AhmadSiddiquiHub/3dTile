import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { Link } from "react-router-dom";

import Login from "../components/Login";
import state from "../store";

const TileDesignPage = () => {
  const snap = useSnapshot(state);

  const handleTextureChange = async (texturePath) => {
    try {
      const response = await fetch(texturePath);
      const blob = await response.blob();
      const textureUrl = URL.createObjectURL(blob);

      const texture = new Image();
      texture.onload = () => {
        state.design = textureUrl;
      };
      texture.src = textureUrl;
    } catch (error) {
      console.error("Error loading texture:", error);
    }
  };

  useEffect(() => {
    state.intro = true;
  }, []);

  return (
    <div className="tile_design mx-[5rem] max-w-[100vw] mt-6">
      <div className="main mx-auto">
        {snap.showLogin && <Login />}
        <div className="content flex flex-col lg:flex-row md:flex-row items-center justify-between">
          <div className="text">
            <h1 className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] font-bold">
              Pierres Naturelles
            </h1>
            <p className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] font-light leading-[20pt] md:leading-[32pt]">
              sur mesure
            </p>
            <p className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] font-light">
              en ligne
            </p>
          </div>
          <button
            onClick={() => (state.showLogin = true)}
            className="mt-[30px] text-[13pt] md:text-[1.458vw] lg:text-[1.458vw] font-bold text-[#C1272D] border-2 border-[#C1272D] py-1 px-5 rounded-[70px] hover:text-white hover:bg-[#C1272D] "
          >
            Demander un devis
          </button>
        </div>
        <div className="tiles mt-[80px] md:mt-[150px] lg:mt-[150px] grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 mb-[400px]">
          <Link
            to="/tile_model/1"
            onClick={() => handleTextureChange("/images/texture-1.jpg")}
          >
            <div className="tile">
              <img
                className="w-[100%] md:w-[70%] lg:w[70%]"
                src="/images/texture-1.jpg"
              />
              <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                Pierre Bleue 5cm, 4cm 3cm et 2cm
              </p>
            </div>
          </Link>
          <Link
            to="/tile_model/2"
            onClick={() => handleTextureChange("/images/texture-2.jpg")}
          >
            <div className="tile">
              <img
                className="w-[100%] md:w-[70%] lg:w[70%]"
                src="/images/texture-2.jpg"
              />
              <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                Granite Noir (iBlack) 2cm et 3cm
              </p>
            </div>
          </Link>
          <Link
            to="/tile_model/3"
            onClick={() => handleTextureChange("/images/texture-3.jpg")}
          >
            <div className="tile">
              <img
                className="w-[100%] md:w-[70%] lg:w[70%]"
                src="/images/texture-3.jpg"
              />
              <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                Marbre Bianco Carrara 2cm
              </p>
            </div>
          </Link>
          <div className="tile">
            <img
              className="w-[100%] md:w-[70%] lg:w[70%]"
              src="/images/tile_design.png"
            />
            <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
              Marbre Cremacé 2cm
            </p>
          </div>

          <div className="tile">
            {/* <img
                  className="w-[100%] md:w-[70%] lg:w[70%]"
                  src="/images/tile_design.png"
                />
                <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Marbre Jura Beige 2cm et 3cm
                </p> */}
          </div>
          <div className="tile">
            <img
              className="w-[100%] md:w-[70%] lg:w[70%]"
              src="/images/tile_design.png"
            />
            <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
              Granite Talila Grey 2cm
            </p>
          </div>
          <div className="tile">
            <img
              className="w-[100%] md:w-[70%] lg:w[70%]"
              src="/images/tile_design.png"
            />
            <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
              Granite Talila Grey 2cm
            </p>
          </div>
          <div className="tile">
            {/* <img
                  className="w-[100%] md:w-[70%] lg:w[70%]"
                  src="/images/tile_design.png"
                />
                <p className="font-bold text-[18pt] md:text-[1.875vw] lg:text-[1.875vw] leading-[30pt] mt-5">
                  Granite Talila Grey 2cm
                </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileDesignPage;
