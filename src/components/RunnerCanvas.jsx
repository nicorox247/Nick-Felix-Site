import BackgroundCanvas from './BackgroundCanvas';
import SpriteCanvas from './SpriteCanvas';

export default function RunnerCanvas({
  spriteImage,
  backgroundImage,
  rotateDeg,
  zones,
  onZoneChange,
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
        zones={zones}
        onZoneChange={onZoneChange}
      />
    </>
  );
}
