import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Research() {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(null);
  const [startScale, setStartScale] = useState(null);
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    let initialScale;
    if (width >= 1280)      initialScale = 1.6;
    else if (width >= 1024) initialScale = 1.6;
    else if (width >= 768)  initialScale = 1.2;
    else                    initialScale = 0.55;
    setScale(initialScale);
    setStartScale(initialScale);
  }, []);

  const triggerZoomIndicator = () => {
    setShowZoomIndicator(true);
    setTimeout(() => setShowZoomIndicator(false), 1000);
  };

  const zoomIn = () => setScale(prev => { triggerZoomIndicator(); return Math.min(prev + 0.2, startScale * 2); });
  const zoomOut = () => setScale(prev => { triggerZoomIndicator(); return Math.max(prev - 0.2, startScale / 2); });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      previewRef.current?.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  const zoomPercent = startScale ? Math.round((scale / startScale) * 100) : 100;

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center text-center">

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">Research Paper · May 2025</p>
        <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight mb-4">
          Transferring Atomic Arbitrage Principles to Multi-Chain Arbitrage Path Discovery and Execution
        </h1>
        <p className="text-sm text-muted mb-8">Roberto Brera &nbsp;·&nbsp; Nick Felix &nbsp;·&nbsp; Taejun Seo</p>

        {/* Abstract */}
        <div className="text-left mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-3">Abstract</h2>
          <p className="text-muted leading-relaxed">
            Price discovery in the Decentralized Finance (DeFi) ecosystem relies on effective arbitrage activity
            across an arbitrary number of assets hosted across multiple chains. The proliferation of Layer-2 protocols
            has added significant complexity to arbitrage activity, often resulting in wide dissonance in exchange rates
            of token pairs hosted across multiple chains. This study makes two major contributions to the body of
            research in multi-chain arbitrage: a practical framework for implementing theoretical guidance on optimizing
            complex atomic arbitrage, and practical recommendations for extending that framework to the multi-chain context.
          </p>
        </div>

        {/* Key Contributions */}
        <div className="text-left mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-3">Key Contributions</h2>
          <ul className="space-y-3">
            {[
              'End-to-end system with four modules: blockchain state listener, graph data processor, modified Bellman-Ford solver, and transaction broadcaster — reduced the token graph from ~400,000 to under 5,000 nodes via preprocessing.',
              'Closed-form CFMM solution for optimal arbitrage trade size, eliminating per-block binary-search overhead.',
              'Theoretical framework extending single-chain atomic arbitrage to multi-chain environments, focusing on Sequence-Independent Arbitrage (SIA) to avoid bridge latency and execution risk.',
            ].map((point, i) => (
              <li key={i} className="flex gap-3 text-muted">
                <span className="mt-1 w-4 h-4 flex-none rounded-full flex items-center justify-center text-[10px] font-bold text-light" style={{ background: 'var(--color-primary)' }}>
                  {i + 1}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA row */}
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/multi-chain-arb.pdf" download className="button-primary px-5 py-2.5 rounded-xl font-semibold text-sm">
            ⬇ Download PDF
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full flex flex-col items-center">
        <div className="mb-4 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
          <div className="flex gap-4">
            <button onClick={zoomOut} className="px-4 py-2 button-secondary rounded-lg text-sm">– Zoom Out</button>
            <button onClick={zoomIn}  className="px-4 py-2 button-secondary rounded-lg text-sm">+ Zoom In</button>
          </div>
          <button onClick={toggleFullscreen} className="px-4 py-2 bg-gray-800 text-light rounded-lg hover:bg-violet-800 transition text-sm">
            {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
        </div>

        {showZoomIndicator && (
          <div className="fixed top-48 left-1/2 -translate-x-1/2 bg-dark bg-opacity-80 text-sm text-light px-4 py-2 rounded shadow-md z-50">
            Zoom: {zoomPercent}%
          </div>
        )}

        <div className="pdf-preview scrollbar-primary" ref={previewRef}>
          {isFullscreen && (
            <button onClick={toggleFullscreen} className="absolute top-8 right-4 z-50 px-5 py-2 text-md button-primary rounded-xl">
              ✖ Exit Fullscreen
            </button>
          )}
          <Document
            file="/multi-chain-arb.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<p className="text-lg py-10 animate-pulse text-light">Loading paper...</p>}
          >
            {Array.from(new Array(numPages), (_, i) => (
              <Page
                key={`page_${i + 1}`}
                pageNumber={i + 1}
                renderTextLayer={false}
                renderAnnotationLayer={true}
                scale={scale}
                className="w-full p-4 items-center"
              />
            ))}
          </Document>
        </div>
        <p className="text-muted mt-4 text-sm">{numPages ? `${numPages} pages` : ''}</p>
      </div>

    </div>
  );
}
