import React from 'react'
import { PDFDownloadLink} from '@react-pdf/renderer';
import ContractPdf from '../Pdf/contractPdf';
import { Loader } from 'semantic-ui-react'

const inProgress = () => <><p>Подготовка договора <Loader size={'mini'} active inline /></p></>

const PdfLink = (props) => {
  return (
  <div>      
    <PDFDownloadLink document={
    <ContractPdf
    contractno={props.data.contractno}
    contractdate={props.data.contractdate}
    company={props.data.company}
    pos={props.data.pos}
    doc={props.data.doc}    
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
    cardsList={props.data.cardsList}
    cardsNum={props.data.cardsNum}
    />
    } 
    fileName="contract.pdf">
      {({ blob, url, loading, error }) =>
        loading ? inProgress() : 'Скачать договор'
      }
    </PDFDownloadLink>
  </div>
  );

}

export default PdfLink