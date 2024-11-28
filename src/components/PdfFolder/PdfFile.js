import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Invoice from "./Invoice/Invoice";
import { Button } from "../../UI/Button/Button";

function PdfFile({ popUpData }) {
  const [loading, setLoading] = useState(false);
  const receiptRef = useRef(null);

  const downloadPDF = async () => {
    setLoading(true);
    try {
      if (receiptRef.current) {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2,
          backgroundColor: "#fff",
          logging: false,
          useCORS: true,
          timeout: 1000,
        });

        const imgData = canvas.toDataURL("image/png", 0.5);
        const pdf = new jsPDF("p", "mm", "a4");

        // Get PDF dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate the image height based on the aspect ratio of the canvas
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add more pages if needed
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save("invoice.pdf");
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff" }}>
      <Invoice popUpData={popUpData} ref={receiptRef} />
      <Button
        label={loading ? "Generating PDF..." : "Download Pdf"}
        size={"btn-lg"}
        type={"btn-primary"}
        element={"button"}
        onClick={downloadPDF}
        customStyles={{
          width: "100%",
          height: "50px",
          borderRadius: "0",
          backgroundColor: "rgba(50, 205, 50, 0.7)",
          position: "sticky",
          bottom: "0",
          zIndex: "100",
        }}
        disabled={loading}
      />
    </div>
  );
}

export default PdfFile;
