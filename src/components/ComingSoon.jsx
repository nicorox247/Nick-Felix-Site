import { useEffect, useState } from 'react';

export default function ComingSoon() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 1000); // Adjust speed here (500ms = half a second)

    return () => clearInterval(interval);
  }, []);

    

    return(
        <div className="h-screen w-full bg-gradient-primary flex-center">
            <h1 className="uppercase text-5xl text-light">
                Coming Soon{dots}
            </h1>
        </div>
    );

}