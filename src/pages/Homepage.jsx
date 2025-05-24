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
        canvasStyle={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />

      {/* Floating content blocks */}
      {/* <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-white text-4xl font-bold p-4">Nick Felix</h1>

        <div className="grid gap-6 p-6 max-w-md mx-auto">
          <a href="/projects" className="block bg-white p-4 rounded shadow hover:bg-gray-100">Projects</a>
          <a href="/resume.pdf" target="_blank" className="block bg-white p-4 rounded shadow hover:bg-gray-100">Resume</a>
          <a href="/research" className="block bg-white p-4 rounded shadow hover:bg-gray-100">Research Paper</a>
          <a href="/about" className="block bg-white p-4 rounded shadow hover:bg-gray-100">Bio</a>
          <a href="/track" className="block bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-500 text-center">
            🏟 Enter Stadium
          </a>
        </div>
      </div> */}
    </div>
  );
}
