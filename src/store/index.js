import { proxy } from "valtio";

const state = proxy({
  intro: true,
  showLogin: false,

  // Dimensions
  length: 100,
  height: 100,
  thickness: 20,
  design: null,

  // Filters
  tileLineFront: false,
  tileLineBack: false,
  tileLineRight: false,
  tileLineLeft: false,
  taperedTopRight: false,
  taperedTopLeft: false,
  taperedBottomRight: false,
  taperedBottomLeft: false,
  halfRoundTopRight: false,
  halfRoundTopLeft: false,
  halfRoundBottomRight: false,
  halfRoundBottomLeft: false,

  fullRoundRight: false,
  fullRoundLeft: false,
});

export default state;
