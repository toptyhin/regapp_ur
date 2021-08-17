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
    dira={'Генерального директора'}
    doca={'Устава'}
    orginn={'5010020015'}
    orgkpp={'501001001'}
    ogrn={'4212421242'}
    address={'Москва Шаболовка 36'}
    email={'dedmoroz@yandex.ru'}
    fio={'Салтыков-Щедрин Георгий Борисович'}
    fioi={'Салтыкова-Щедрина Георгия Борисовича'}
    bankrs={'407028107000400050098'}
    bik={'0445250225'}
    bank={'ПАО НЕПАОПРОМ'}
    bankks={'30101810100000225'}
    phone={'+7 929 900 00 01'}
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