import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(2); // default zoom level
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const triggerZoomIndicator = () => {
    setShowZoomIndicator(true);
    setTimeout(() => setShowZoomIndicator(false), 1000); // hide after 1s
  };

  const zoomIn = () => {
    setScale(prev => {
      const newScale = Math.min(prev + 0.2, 3);
      triggerZoomIndicator();
      return newScale;
    });
  };

  const zoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.2, 0.5);
      triggerZoomIndicator();
      return newScale;
    });
  };

  const zoomPercent = Math.round((scale / 2) * 100);

  return (
    <div className="min-h-screen px-4 py-16 flex flex-col items-center justify-start text-center">
      <h1 className="text-4xl text-dark font-bold mb-6">📄 My Resume</h1>

        {/* Zoom controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={zoomOut}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm"
          >
            ➖ Zoom Out
          </button>
          <button
            onClick={zoomIn}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm"
          >
            ➕ Zoom In
          </button>
        </div>

        {/* Zoom Indicator */}
        {showZoomIndicator && (
          <div className="absolute top-48 bg-dark bg-opacity-80 text-sm text-light px-4 py-2 rounded shadow-md z-50 transition-opacity duration-300">
            Zoom: {zoomPercent}%
          </div>
        )}

      {/* Scrollable preview container */}
      <div className="pdf-preview scrollbar-primary">
        <Document
          file="/resume_summer_2025.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p className="text-lg py-10">Loading resume...</p>}
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

      <a
        href="/resume_summer_2025.pdf"
        download
        className="mt-6 inline-block button-primary px-6 py-3 rounded-xl shadow transition"
      >
        ⬇ Download PDF
      </a>
    </div>
  );
}
