import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { ReplayComposition } from "./composition.jsx";
let root = null;
function renderReplay(history, container, width, height) {
  if (root) {
    root.unmount();
  }
  root = createRoot(container);
  const durationInFrames = history.length;
  const containerWidth = container.clientWidth;
  const compositionWidth = 540;
  const compositionHeight = 960;
  const playerHeight = containerWidth / compositionWidth * compositionHeight;
  root.render(
    /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: `${playerHeight}px` }, children: /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: ReplayComposition,
        durationInFrames,
        fps: 60,
        compositionWidth,
        compositionHeight,
        loop: true,
        controls: true,
        autoplay: true,
        style: { width: "100%", height: "100%" },
        inputProps: { history, gameWidth: width, gameHeight: height }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 24,
      columnNumber: 5
    }, this)
  );
}
function unmountReplay() {
  if (root) {
    root.unmount();
    root = null;
  }
}
export {
  renderReplay,
  unmountReplay
};
