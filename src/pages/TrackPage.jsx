import RunnerCanvas from '../components/RunnerCanvas';
import athleteSprite from '../assets/athlete-sprite.png';
import trackTile from '../assets/track-tile.png';

export default function TrackPage() {
  return (
    <RunnerCanvas
      spriteImage={athleteSprite}
      backgroundImage={trackTile}
      idleRadius={20} // tighter idle threshold for precise movement
      scale={1.5}
      runningFrames={[1, 2, 3, 4]}
      gridCols={2}
    />
  );
}
