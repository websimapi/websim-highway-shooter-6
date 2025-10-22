import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, Sequence } from "remotion";
const HealthText = ({ data, zIndex }) => {
  if (!data || data.health <= 0) return null;
  return /* @__PURE__ */ jsxDEV("div", { style: {
    position: "absolute",
    left: data.x,
    top: data.y,
    width: data.width,
    height: data.height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: `${Math.min(48, data.width * 0.7)}px`,
    color: "white",
    fontWeight: "bold",
    textShadow: "2px 2px 4px black",
    zIndex
  }, children: data.health }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 7,
    columnNumber: 9
  });
};
const GameObject = ({ data, textureUrl, zIndex = 0 }) => {
  if (!data) return null;
  const style = {
    position: "absolute",
    left: data.x,
    top: data.y,
    width: data.width,
    height: data.height,
    transform: `rotate(${data.rotation || 0}rad) scale(${data.scale || 1})`,
    zIndex
  };
  return /* @__PURE__ */ jsxDEV(Img, { src: textureUrl, style }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 38,
    columnNumber: 12
  });
};
const BombEffect = ({ data }) => {
  if (!data) return null;
  return /* @__PURE__ */ jsxDEV("div", { style: {
    position: "absolute",
    left: data.x - data.radius,
    top: data.y - data.radius,
    width: data.radius * 2,
    height: data.radius * 2,
    borderRadius: "50%",
    backgroundColor: "white",
    opacity: data.opacity,
    zIndex: 10
  } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 44,
    columnNumber: 9
  });
};
const Particle = ({ data }) => {
  if (!data) return null;
  return /* @__PURE__ */ jsxDEV("div", { style: {
    position: "absolute",
    left: data.x,
    top: data.y,
    width: data.size,
    height: data.size,
    backgroundColor: data.color,
    opacity: data.opacity,
    borderRadius: "50%",
    zIndex: 15
  } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 60,
    columnNumber: 12
  });
};
const ReplayComposition = ({ history, gameWidth, gameHeight }) => {
  const frame = useCurrentFrame();
  const currentFrameData = history[frame] || history[history.length - 1];
  if (!currentFrameData) {
    return null;
  }
  const { player, projectiles, barrels, enemies, barriers, powerups, particles, bombEffects, audioEvents } = currentFrameData;
  const scale = 540 / gameWidth;
  const offsetX = 0;
  const offsetY = (960 - gameHeight * scale) / 2;
  const transformStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    position: "absolute",
    left: offsetX,
    top: offsetY,
    width: gameWidth,
    height: gameHeight
  };
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#283747" }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: transformStyle, children: [
      /* @__PURE__ */ jsxDEV(GameObject, { data: player, textureUrl: "/player_ship.png", zIndex: 5 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 101,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(GameObject, { data: player, textureUrl: "/weapon.png", zIndex: 6 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 102,
        columnNumber: 17
      }),
      projectiles.map((p, i) => /* @__PURE__ */ jsxDEV(GameObject, { data: p, textureUrl: "/projectile.png", zIndex: 4 }, `proj-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 44
      })),
      barrels.map((b, i) => /* @__PURE__ */ jsxDEV(GameObject, { data: b, textureUrl: "/barrel.png", zIndex: 2 }, `barl-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 106,
        columnNumber: 40
      })),
      barrels.map((b, i) => /* @__PURE__ */ jsxDEV(HealthText, { data: b, zIndex: 3 }, `barl-h-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 107,
        columnNumber: 40
      })),
      enemies.map((e, i) => /* @__PURE__ */ jsxDEV(GameObject, { data: e, textureUrl: "/enemy.png", zIndex: 4 }, `enmy-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 108,
        columnNumber: 40
      })),
      barriers.map((b, i) => /* @__PURE__ */ jsxDEV(GameObject, { data: b, textureUrl: "/barrier.png", zIndex: 2 }, `bari-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 109,
        columnNumber: 41
      })),
      barriers.map((b, i) => /* @__PURE__ */ jsxDEV(HealthText, { data: b, zIndex: 3 }, `bari-h-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 110,
        columnNumber: 41
      })),
      powerups.map((p, i) => /* @__PURE__ */ jsxDEV(GameObject, { data: p, textureUrl: `/${p.type}.png`, zIndex: 7 }, `pow-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 111,
        columnNumber: 41
      })),
      bombEffects.map((b, i) => /* @__PURE__ */ jsxDEV(BombEffect, { data: b }, `bomb-e-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 44
      })),
      particles.map((p, i) => /* @__PURE__ */ jsxDEV(Particle, { data: p }, `part-${i}`, false, {
        fileName: "<stdin>",
        lineNumber: 115,
        columnNumber: 42
      }))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 99,
      columnNumber: 13
    }),
    audioEvents.map((audio, i) => /* @__PURE__ */ jsxDEV(Sequence, { from: frame, durationInFrames: 1, children: /* @__PURE__ */ jsxDEV(Audio, { src: `/${audio}.mp3` }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 121,
      columnNumber: 21
    }) }, `audio-${i}`, false, {
      fileName: "<stdin>",
      lineNumber: 120,
      columnNumber: 17
    }))
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 98,
    columnNumber: 9
  });
};
export {
  ReplayComposition
};
