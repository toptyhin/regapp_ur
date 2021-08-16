import React from 'react'
import { PDFDownloadLink, Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';
import ContractPdf from '../Pdf/contractPdf';

const PdfLink = (props) => {
  return (
  <div>      
    <PDFDownloadLink document={
    <ContractPdf
    contractno={'12-25/GHFGF'}
    contractdate={'12-12-2021'}
    company={'ООО "ЛЕНИВЕЦ"'}
    dira={'Иванова Ивана Ивановича'}
    doca={'Устава'}
    />
    } 
    fileName="contract.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div>
  );

}

export default PdfLink