import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Resume_AI_JOB__Chinmoy_Mitra_.pdf";
// import pdf from "../../Assets/Chinmoy_Mitra_Resume.pdf";

import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <div className="resume-glass-wrapper">
          <Row style={{ justifyContent: "center", position: "relative" }}>
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              className="resume-download-btn"
            >
              <AiOutlineDownload /> &nbsp;Download CV
            </Button>
          </Row>

          <Row className="resume justify-content-center">
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              className="resume-document d-flex flex-column align-items-center"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={Math.min(width - 96, width >= 1440 ? 1280 : 1024)}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="resume-page"
                />
              ))}
            </Document>
          </Row>

          <Row style={{ justifyContent: "center", position: "relative" }}>
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              className="resume-download-btn"
            >
              <AiOutlineDownload /> &nbsp;Download CV
            </Button>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ResumeNew;
