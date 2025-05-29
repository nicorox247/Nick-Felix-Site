import RunnerCanvas from '../components/RunnerCanvas';
import athleteSprite from '../assets/athlete-sprite.png';
import courtyardTile from '../assets/courtyard-tile.png'; // your chill bg

export default function Homepage() {
  return (
    <div style={{ position: 'relative' }}>
      <RunnerCanvas
        spriteImage={athleteSprite}
        backgroundImage={courtyardTile}
        idleRadius={80}
        rotateDeg={0}
        canvasStyle={{
          position: 'relative',
          top: 0,
          left: 0,
          // width: '100%',
          // height: '100%',
          zIndex: 0, 
        }}
        
      />

    </div>
  );
}
