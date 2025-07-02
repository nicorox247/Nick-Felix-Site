// src/components/ColorPaletteTest.jsx
export default function ColorPaletteTest() {
    const colors = [
      { name: 'Background', var: 'var(--color-background)', text: 'white' },
      { name: 'Primary', var: 'var(--color-primary)', text: 'white' },
      { name: 'Accent', var: 'var(--color-accent)', text: 'black' },
      { name: 'Highlight', var: 'var(--color-highlight)', text: 'black' },
      { name: 'Error', var: 'var(--color-error)', text: 'white' },
      { name: 'Dark', var: 'var(--color-dark)', text: 'white' },
      { name: 'Light', var: 'var(--color-light)', text: 'black' },
    ];
  
    return (

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-light)' }}>

      {colors.map(({ name, var: cssVar, text }) => (
                <div
                  key={name}
                  className="rounded-lg shadow-md p-6 text-center font-semibold"
                  style={{
                    backgroundColor: cssVar,
                    color: text,
                  }}
                >
                  {name}
                  <div className="mt-2 text-sm font-normal opacity-70">{cssVar}</div>
                </div>
              ))}
      {/* Header */}
      <header className="p-6 shadow-md" style={{ backgroundColor: 'var(--color-primary)' }}>
        <h1 className="text-3xl font-bold">Color Theme Demo</h1>
        <p className="text-sm mt-1 opacity-80">Using your custom palette in a real layout</p>
      </header>

      {/* Main Content */}
      <main className="p-8 space-y-10">
        {/* Buttons */}
        <div className="space-x-4">
          <button
            className="px-4 py-2 rounded font-semibold"
            style={{ backgroundColor: 'var(--color-accent)', color: 'black' }}
          >
            Accent Button
          </button>
          <button
            className="px-4 py-2 rounded font-semibold"
            style={{ backgroundColor: 'var(--color-highlight)', color: 'black' }}
          >
            Highlight Button
          </button>
        </div>

        {/* Card */}
        <div
          className="rounded-lg shadow-lg p-6 max-w-md bg-light"

        >
          <h2 className="text-xl font-bold mb-2">Info Card</h2>
          <p className="text-sm text-gray-700">
            This card uses the light color for background and black text. Great for foreground content.
          </p>
          <div
            className="mt-4 p-3 rounded"
            style={{ backgroundColor: 'var(--color-highlight)', color: 'black' }}
          >
            Highlight zone inside the card.
          </div>
        </div>

        {/* Error Alert */}
        <div
          className="rounded p-4 font-semibold max-w-md"
          style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
        >
          ⚠️ Error: Something went wrong!
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 opacity-70" style={{ backgroundColor: 'var(--color-dark)' }}>
        &copy; 2025 Your Website — Styled with Custom Palette
      </footer>
    </div>

    );
  }
