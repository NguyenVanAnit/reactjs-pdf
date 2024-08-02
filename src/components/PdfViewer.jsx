import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
// import samplePDF from './test.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PdfViewer = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
    ).toString();

    const [numPages, setNumPages] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileUpload = (event) => {
        const file = event.target.files[0];
        const filePdf = new FileReader();

        filePdf.onload = (e) => {
            setPdfData(e.target.result)
        };

        filePdf.readAsDataURL(file);
        setSelectedFile(file);
    }

    const uploadNumberPages = ({numPages}) => {
        console.log('numberPages')
        setNumPages(numPages);
    }

    return(
        <div>
            <input type="file" accept=".pdf" onChange={fileUpload}/>

            {
                pdfData && (
                    <Document file={pdfData} onLoadSuccess={uploadNumberPages}>
                        {/* <Page pageNumber={pageNumber}></Page> */}
                        {Array.from(
                            new Array(numPages),
                            (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                            ),
                        )}
                    </Document>
                )
            }            
            {
                pdfData && (
                    <p>Page {pageNumber} of {numPages}</p>
                )
            }
        </div>
    )
}

export default PdfViewer;