import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(null); // default zoom level
  const [startScale, setStartScale] = useState(null); // default zoom level
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);


  useEffect(() => {
    const width = window.innerWidth;
    let initialScale;
  
    if (width >= 1280) {
      initialScale = 2;
    } else if (width >= 1024) {
      initialScale = 1.6;
    } else if (width >= 768) {
      initialScale = 1.2;
    } else {
      initialScale = 0.55;
    }
  
    setScale(initialScale);
    setStartScale(initialScale);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const triggerZoomIndicator = () => {
    setShowZoomIndicator(true);
    setTimeout(() => setShowZoomIndicator(false), 1000); // hide after 1s
  };

  const zoomIn = () => {
    setScale(prev => {
      const newScale = Math.min(prev + 0.2, (startScale*2));
      triggerZoomIndicator();
      return newScale;
    });
  };

  const zoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.2, (startScale/2));
      triggerZoomIndicator();
      return newScale;
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      previewRef.current?.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const zoomPercent = Math.round((scale / startScale) * 100);

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center justify-start text-center">
      <h1 className="text-4xl text-dark font-bold mb-6">📄 My Resume</h1>

      {/* Zoom controls row */}
      <div className="mb-4 flex flex-col items-center gap-3 md:flex-row md:justify-center md:items-center md:gap-6">
        <div className="flex gap-4">
          <button
            onClick={zoomOut}
            className="px-4 py-2 button-secondary rounded-lg transition duration-50 text-sm"
          >
            – Zoom Out
          </button>
          <button
            onClick={zoomIn}
            className="px-4 py-2 button-secondary rounded-lg transition duration-50 text-sm"
          >
            + Zoom In
          </button>
        </div>

        {/* Fullscreen/Download row */}
        <div className="flex gap-4">
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-gray-800 text-light rounded-lg hover:bg-violet-800 transition text-sm"
          >
            {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
          <a
            href="/resume_summer_2025.pdf"
            download
            className="inline-block button-primary px-6 py-3 rounded-xl shadow transition text-sm"
          >
            ⬇ Download PDF
          </a>
        </div>
      </div>



        {/* Zoom Indicator */}
        {showZoomIndicator && (
          <div className="absolute top-48 bg-dark bg-opacity-80 text-sm text-light px-4 py-2 rounded shadow-md z-50 transition-opacity duration-500 ease-in-out animate-fade">
            Zoom: {zoomPercent}%
          </div>
        )}

      {/* Scrollable preview container */}
      <div className="pdf-preview scrollbar-primary" ref={previewRef}>

      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-8 right-4 z-50 px-5 py-2 text-md button-primary rounded-xl"
        >
          ✖ Exit Fullscreen
        </button>
      )}
        <Document
          file="/resume_summer_2025.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p className="text-lg py-10 animate-pulse text-light">Loading resume...</p>}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={true}
              scale={scale}
              className="w-full p-4 items-center"
            />
          ))}
        </Document>
      </div>

      <p className="text-muted mt-4">Page previewed: 1 of {numPages}</p>

    </div>
  );
}
