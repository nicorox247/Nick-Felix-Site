import BackgroundCanvas from './BackgroundCanvas';
import SpriteCanvas from './SpriteCanvas';

export default function RunnerCanvas({
  spriteImage,
  backgroundImage,
  rotateDeg,
  onPlayerMove,
  onCanvasResize,
}) {
  return (
    <>
      <BackgroundCanvas
        backgroundImage={backgroundImage}
        rotateDeg={rotateDeg}
        onResize={onCanvasResize}
      />
      <SpriteCanvas
        spriteImage={spriteImage}
        onPlayerMove={onPlayerMove}
      />
    </>
  );
}
