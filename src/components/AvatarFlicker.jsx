import { useState } from 'react';

export default function AvatarFlickerClick() {
  const [flickerActive, setFlickerActive] = useState(false);
  const [showSuit, setShowSuit] = useState(true);
  const [showTrack, setShowTrack] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = () => {
    if (isLocked) return;

    setIsLocked(true);
    setFlickerActive(true);

    // Step 1: Flicker starts
    setTimeout(() => {
      setShowTrack(true); // Reveal track halfway through animation
    }, 900);

    // Step 2: End flicker, hide suit
    setTimeout(() => {
      setFlickerActive(false);
      setShowSuit(false);
    }, 1800); // flicker ends

    // Step 3: Revert to suit
    setTimeout(() => {
      setShowSuit(true);
      setShowTrack(false);
    }, 8000); // after 5s

    // Step 4: Reset lock
    setTimeout(() => {
      setIsLocked(false);
    }, 11000);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-56 h-56 rounded-full overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ${
        flickerActive ? 'ring-4 ring-highlight shadow-[0_0_30px_#2465ffaa]' : ''
      }`}
      title="Click to transform"
    >
      {/* Track Avatar: starts hidden, fades in mid-flicker */}
      <img
        src="/images/avatar-track.jpg"
        alt="Track Avatar"
        className={`absolute inset-0 w-full h-full object-cover object-[80%_10%] z-0 transition-opacity duration-500 ${
          showTrack ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Suit Avatar: flickers and then fades out */}
      {showSuit && (
        <img
          src="/images/avatar.jpg"
          alt="Suit Avatar"
          className={`absolute inset-0 w-full h-full object-cover z-10 rounded-full transition-opacity duration-700 ${
            flickerActive ? 'animate-flicker' : ''
          }`}
        />
      )}

      {/* Glow overlay */}
      {flickerActive && (
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle,#ffffff33_0%,transparent_70%)] blur-lg" />
      )}
    </div>
  );
}
