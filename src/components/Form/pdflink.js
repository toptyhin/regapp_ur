import React from 'react'
import { PDFDownloadLink} from '@react-pdf/renderer';
import ContractPdf from '../Pdf/contractPdf';

const PdfLink = (props) => {
  return (
  <div>      
    <PDFDownloadLink document={
    <ContractPdf
    contractno={props.data.contractno}
    contractdate={props.data.contractdate}
    company={props.data.company}
    dira={props.data.dira}
    doca={props.data.doca}
    orginn={props.data.orginn}
    orgkpp={props.data.orgkpp}
    ogrn={props.data.ogrn}
    address={props.data.address}
    email={props.data.email}
    fio={props.data.fio}
    fioi={props.data.fioi}
    bankrs={props.data.bankrs}
    bik={props.data.bik}
    bank={props.data.bank}
    bankks={props.data.bankks}
    phone={props.data.phone}
    />
    } 
    fileName="contract.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Подготовка договора...' : 'Скачать договор'
      }
    </PDFDownloadLink>
  </div>
  );

}

export default PdfLink