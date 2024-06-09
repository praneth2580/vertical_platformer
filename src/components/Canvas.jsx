import React, { useEffect, useRef } from "react";

const Canvas = (props) => {
  const canvasRef = useRef();

  const { draw, player_controller, ...rest } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (player_controller) player_controller.bindToCanvas(canvas);
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
