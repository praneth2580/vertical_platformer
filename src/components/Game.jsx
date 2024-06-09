import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { SIZE } from "./Constants";
import { getWindowDimensions } from "./Functions";
import Gravity from "./Gravity";
import Player from "./Player";
import PlayerController from "./PlayerController";

function Game() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  var gravity, player, player_controller;

  const run = () => {
    // GAME ENTITES
    gravity = new Gravity(0.35);
     player = new Player(
      {
        x: 0,
        y: 0,
      },
      {
        width: 10,
        height: 20,
      }
    );
    player_controller = new PlayerController();
  
    gravity.bindEntity(player);
    player_controller.bindPlayer(player);
  }
  run()

  const draw = (ctx, frameCount) => {
    if (!player || !gravity || !player_controller) return
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#71a1f0";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gravity.calculate();
    player.update(ctx, frameCount);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,1,1);
    ctx.fillRect(2,0,1,1);
    ctx.fillRect(3,0,1,1);
    ctx.fillRect(5,0,1,1);
    player_controller.update(ctx, frameCount);
  };

  const useWindowDimensions = () => windowDimensions;

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  // useEffect(() => {
  //   run()
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Canvas
        draw={draw}
        player_controller={player_controller}
        width={SIZE.width}
        height={SIZE.height}
        style={
          {
            height: '100vh'
          }
        }
      />
    </div>
  );
}

export default Game;
