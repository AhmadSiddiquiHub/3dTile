import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

// Pages
import state from "../store";
import Canvas from "../canvas/Canvas";
import Login from "../components/Login";

const TileModelPage = () => {
  const snap = useSnapshot(state);

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleTextureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        state.design = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFullRoundLeft = () => {
    state.fullRoundLeft = !state.fullRoundLeft;
    state.taperedTopRight = false;
    state.taperedTopLeft = false;
    state.taperedBottomRight = false;
    state.taperedBottomLeft = false;
    state.halfRoundTopRight = false;
    state.halfRoundTopLeft = false;
    state.halfRoundBottomRight = false;
    state.halfRoundBottomLeft = false;
  };
  const handleFullRoundRight = () => {
    state.fullRoundRight = !state.fullRoundRight;
    state.taperedTopRight = false;
    state.taperedTopLeft = false;
    state.taperedBottomRight = false;
    state.taperedBottomLeft = false;
    state.halfRoundTopRight = false;
    state.halfRoundTopLeft = false;
    state.halfRoundBottomRight = false;
    state.halfRoundBottomLeft = false;
  };

  useEffect(() => {
    state.intro = false;
  }, []);

  return (
    <>
      <div className="tile_model max-w-[100vw] mt-[60px] md:mt-[150px] ">
        <div className="md:mx-[8rem]">
          <div className="main mx-auto">
            {snap.showLogin && <Login />}

            <div className="content flex flex-col lg:flex-row md:flex-row items-center justify-between">
              <div className="text ">
                <h1 className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] leading-[27pt] md:leading-[32pt] font-bold">
                  Personnalisez
                </h1>
                <p className="text-[18pt] md:text-[3.333vw] lg:text-[3.333vw] font-bold">
                  votre Pierre
                </p>
              </div>
              <button
                onClick={() => (state.showLogin = true)}
                className="mt-[30px] text-[13pt] md:text-[1.458vw] lg:text-[1.458vw] font-bold text-[#C1272D] border-2 border-[#C1272D] py-1 px-5 rounded-[70px] hover:text-white hover:bg-[#C1272D]"
              >
                Demander un devis
              </button>
            </div>

            {/* Sizes */}
            <div className="sizes grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-4 mt-[120px]">
              <div className="size text-center ">
                <h3 className="mb-4 md:text-[1.597vw] text-[#C1272D] font-bold">
                  Longueur (mm)
                </h3>
                <input
                  id="length"
                  className="outline-none border-2 border-[#C1272D] rounded-[50px] py-2 px-10"
                  type="number"
                  placeholder="Longueur"
                  value={snap.length}
                  onChange={(e) => (state.length = e.target.value)}
                />
              </div>
              <div className="size text-center ">
                <h3 className="mb-4 md:text-[1.597vw] text-[#C1272D] font-bold">
                  Largeur (mm)
                </h3>
                <input
                  id="width"
                  className="outline-none border-2 border-[#C1272D] rounded-[50px] py-2 px-10"
                  type="number"
                  // min={100}
                  placeholder="Largeur"
                  value={snap.height}
                  onChange={(e) => (state.height = e.target.value)}
                />
              </div>
              <div className="size text-center ">
                <h3 className="mb-4 md:text-[1.597vw] text-[#C1272D] font-bold">
                  Épaisseur (mm)
                </h3>
                <input
                  id="thickness"
                  className="outline-none border-2 border-[#C1272D] rounded-[50px] py-2 px-10"
                  type="number"
                  // min={20}
                  placeholder="Épaisseur"
                  value={snap.thickness}
                  onChange={(e) => (state.thickness = e.target.value)}
                />
              </div>
              <div className="size text-center ">
                <h3 className="mb-4 md:text-[1.597vw] text-[#C1272D] font-bold">
                  Matière (mm)
                </h3>
                <input
                  id="design"
                  className="outline-none border-2 border-[#C1272D] rounded-[50px] py-2 px-10"
                  key={fileInputKey} // Reset file input when key changes
                  type="file"
                  accept="image/*"
                  onChange={handleTextureChange}
                />
              </div>
            </div>

            {/* Model */}
            <div className="model mt-[80px] flex items-center justify-center">
              {snap.length != 0 && snap.height != 0 ? (
                <Canvas />
              ) : (
                <img className="w-[90%] md:w-auto" src="/images/model.png" />
              )}
            </div>

            {/* Details */}
            <div className="details">
              <div className="details-content mx-[1rem] mt-[60px] grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="detail mx-auto md:mx-0">
                  <h3 className="text-[13pt] md:text-[1.597vw] font-bold">
                    Finition Coté 1
                  </h3>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center outline-none">
                      <input
                        id="check-box-1"
                        type="checkbox"
                        value={snap.tileLineFront}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none"
                        checked={snap.tileLineFront}
                        onChange={() =>
                          (state.tileLineFront = !state.tileLineFront)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition " />
                    </label>
                    Ligne
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center outline-none">
                      <input
                        id="check-box-2"
                        type="checkbox"
                        value={snap.taperedTopRight}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none"
                        checked={snap.taperedTopRight}
                        disabled={
                          snap.halfRoundTopRight ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.taperedTopRight = !state.taperedTopRight)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition " />
                    </label>
                    Bizoté
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-3"
                        type="checkbox"
                        value={snap.halfRoundTopRight}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        checked={snap.halfRoundTopRight}
                        disabled={
                          snap.taperedTopRight ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.halfRoundTopRight = !state.halfRoundTopRight)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Arrondie
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-4"
                        type="checkbox"
                        value={snap.fullRoundRight}
                        checked={snap.fullRoundRight}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        onChange={handleFullRoundRight}
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    ArrondieX
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-5"
                        type="checkbox"
                        value=""
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Finition
                  </p>
                </div>
                <div className="detail mx-auto md:mx-0">
                  <h3 className="text-[13pt] md:text-[1.597vw] font-bold">
                    Finition Coté 2
                  </h3>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-6"
                        type="checkbox"
                        value={snap.tileLineBack}
                        checked={snap.tileLineBack}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        onChange={() =>
                          (state.tileLineBack = !state.tileLineBack)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Ligne
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-7"
                        type="checkbox"
                        value={snap.taperedTopLeft}
                        checked={snap.taperedTopLeft}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        disabled={
                          snap.halfRoundTopLeft ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.taperedTopLeft = !state.taperedTopLeft)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Bizoté
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-8"
                        type="checkbox"
                        value={snap.halfRoundTopLeft}
                        checked={snap.halfRoundTopLeft}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        disabled={
                          snap.taperedTopLeft ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.halfRoundTopLeft = !state.halfRoundTopLeft)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Arrondie
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-9"
                        type="checkbox"
                        value={snap.fullRoundLeft}
                        checked={snap.fullRoundLeft}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        onChange={handleFullRoundLeft}
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    ArrondieX
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-10"
                        type="checkbox"
                        value=""
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Finition
                  </p>
                </div>
                <div className="detail mx-auto md:mx-0">
                  <h3 className="text-[13pt] md:text-[1.597vw] font-bold">
                    Finition Coté 3
                  </h3>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-11"
                        type="checkbox"
                        value={snap.tileLineRight}
                        checked={snap.tileLineRight}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        onChange={() =>
                          (state.tileLineRight = !state.tileLineRight)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Ligne
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-12"
                        type="checkbox"
                        value={snap.taperedBottomRight}
                        checked={snap.taperedBottomRight}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        disabled={
                          snap.halfRoundBottomRight ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.taperedBottomRight = !state.taperedBottomRight)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Bizoté
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-13"
                        type="checkbox"
                        value={snap.halfRoundBottomRight}
                        checked={snap.halfRoundBottomRight}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        disabled={
                          snap.taperedBottomRight ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.halfRoundBottomRight =
                            !state.halfRoundBottomRight)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Arrondie
                  </p>
                  {/* <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-9"
                        type="checkbox"
                        value=""
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    ArrondieX
                  </p> */}
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-14"
                        type="checkbox"
                        value=""
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Finition
                  </p>
                </div>
                <div className="detail mx-auto md:mx-0">
                  <h3 className="text-[13pt] md:text-[1.597vw] font-bold">
                    Finition Coté 4
                  </h3>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-15"
                        type="checkbox"
                        value={snap.tileLineLeft}
                        checked={snap.tileLineLeft}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        onChange={() =>
                          (state.tileLineLeft = !state.tileLineLeft)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Ligne
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-16"
                        type="checkbox"
                        value={snap.taperedBottomLeft}
                        checked={snap.taperedBottomLeft}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        disabled={
                          snap.halfRoundBottomLeft ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.taperedBottomLeft = !state.taperedBottomLeft)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Bizoté
                  </p>
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-17"
                        type="checkbox"
                        value={snap.halfRoundBottomLeft}
                        checked={snap.halfRoundBottomLeft}
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                        disabled={
                          snap.taperedBottomLeft ||
                          snap.fullRoundRight ||
                          snap.fullRoundLeft ||
                          snap.fullRoundLeft ||
                          snap.fullRoundRight
                        }
                        onChange={() =>
                          (state.halfRoundBottomLeft =
                            !state.halfRoundBottomLeft)
                        }
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Arrondie
                  </p>
                  {/* <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-12"
                        type="checkbox"
                        value=""
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    ArrondieX
                  </p> */}
                  <p className="text-[13pt] md:text-[1.597vw] font-light flex items-center gap-8">
                    <label className="cursor-pointer relative flex items-center">
                      <input
                        id="check-box-18"
                        type="checkbox"
                        value=""
                        className="check-box w-5 h-5 appearance-none border-2 rounded border-red-600 outline-none "
                      />
                      <FaCheck className="text-sm w-3 h-3 text-red-600 absolute left-1 text-opacity-0 check-1 transition" />
                    </label>
                    Finition
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="total mb-[60px]">
                <div className="flex w-[95%] mx-auto mt-[40px]">
                  <div className="left bg-[#626E7B] py-4 w-[80%]"></div>
                  <div className="right bg-[#C1272D] py-4 w-[20%]">
                    <p className="text-white text-end pr-[1rem] text-[1.597vw] font-light">
                      Prix (htva) : <span className="font-bold"> 120,09</span>
                    </p>
                  </div>
                </div>
                <div className="sperater mt-[12px] w-[95%] mx-auto ">
                  <hr className="h-[1px] border-none bg-[#626E7B]"></hr>
                </div>
              </div>
            </div>

            {/* Add */}
            <div className="add text-center mb-[250px]">
              <h2 className="text-[3.819vw] font-bold">
                Ajouter une autre Tablette/Seuil
              </h2>
              <Link to="/">
                <button>
                  <img src="/images/add.png" />
                </button>
              </Link>
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

export default TileModelPage;
