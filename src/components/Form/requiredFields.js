import React, { useState } from "react";
import {
    Form,
    Segment,
    Transition,
  } from "semantic-ui-react";

  import ReactDadataBox from 'react-dadata-box';
  import RFSegment from './requiredFieldsSegment';
  import MaskedAccountNum from "./maskedAccountNum";
  import AppContext from './appContext'
  

const RequiredFields = (props) => {


  const {state} = React.useContext(AppContext);
  const [bankName, setBankName] = useState(state.companyDetails.bank ? state.companyDetails.bank : false);
  const [bankDetails, setBankDetails] = useState({
    address: state.companyDetails.baddress ? state.companyDetails.baddress : '',
    bik: state.companyDetails.bik ? state.companyDetails.bik : '',
    inn: '',
    name: state.companyDetails.bank ? state.companyDetails.bank : '',
    corr: state.companyDetails.ks ? state.companyDetails.ks : '',
    account: state.companyDetails.rs ? state.companyDetails.rs : ''
  });


  const [lastFieldComplete, setLastFieldComplete] = useState(false);

  const getManagement = () => {
    let name = state.companyDetails.fio;
    if (!name ){
      name = props.dadata.management && props.dadata.management.name ? props.dadata.management.name : ''
    }
    return name;
  };
  
  const bankNameRender = () => bankName ? 'Название банка':'БИК Банка'
  const bankSelected = (sugg) => {
    setBankDetails({
      address: sugg.data.address ? sugg.data.address.value : '',
      bik: sugg.data.bic ? sugg.data.bic : '',
      inn: sugg.data.inn ? sugg.data.inn : '',
      name: sugg.data.name ? sugg.data.name.payment : '',
      corr: sugg.data.correspondent_account ? sugg.data.correspondent_account : '',
      account: ''
    });
    setBankName(sugg.value || '');
    setFieldData('bank',sugg.data.name ? sugg.data.name.payment : '');
    setFieldData('bik',sugg.data.bic ? sugg.data.bic : '');
    setFieldData('ks',sugg.data.correspondent_account ? sugg.data.correspondent_account : '');
    setFieldData('baddress',sugg.data.address ? sugg.data.address.value : '');
  }
  
  // const setActiveField = (str) => {
  //   setColor(str, {
  //     active: true,
  //     error: false,
  //     complete: false
  //   })
  // }

  console.log(state);
  console.log(state.companyDetails);

  const [internalFieldsData, setInternalFieldsData] = useState(
    {
      'fio': getManagement(),
      'fioi': state.companyDetails.fioi ? state.companyDetails.fioi : '',
      'position': state.companyDetails.position ? state.companyDetails.position : '',
      'positiona': state.companyDetails.positiona ? state.companyDetails.positiona : '',
      'based': state.companyDetails.based ? state.companyDetails.based : '',
      'baseda': state.companyDetails.baseda ? state.companyDetails.baseda : '',
    }
  );


  const setFieldData = (key,val) => {
    const _intObj = internalFieldsData;
    _intObj[key] = val;
    setInternalFieldsData(_intObj);
    props.passData(key,val)
  };
  
  const validRS = (num) => {
    if (num.match(/^\d{20}$/)) {
      return num
    } else {
      return '';
    }
  }
  
  

  const errorField = (name) => {
    return lastFieldComplete && internalFieldsData[name] === ''
  };
  
const nameString = () => (
  <>
  <b>{props.dadata.name}</b>
  {props.dadata.inn ? ' ИНН: ' + props.dadata.inn : ''}
  {props.dadata.kpp ? ' КПП: '+props.dadata.kpp : ''}
  {props.dadata.ogrn ? ' ОГРН: '+props.dadata.ogrn : ''}
  </>
);

// setFieldData('fio',getManagement());

// console.log('FIOI', errorField('fioi'))
  return (
      <Segment.Group>
      <Segment>{nameString()}</Segment>
      <Segment.Group>
        <Segment.Group horizontal>
          <RFSegment 
            label={'Подписант ФИО'}
            placeholder={'Иванов Иван Иванович'}
            hasError = {errorField('fio')}
            value = {getManagement()}
            // value = {manager}
            change = {(val)=> setFieldData('fio',val)}
          />
        </Segment.Group>
        <Segment.Group horizontal>
          <RFSegment 
            label={'Должность'}
            placeholder={'Директор'}
            hasError = {errorField('position')}
            value={internalFieldsData.position}
            change = {(val)=> {
              setFieldData('position',val);
            }}
          />
        </Segment.Group>
        <Segment.Group horizontal>
          <RFSegment 
            label={'Основание'}
            placeholder={'Устав / Доверенность от 00.00.2021'}
            hasError = {errorField('based')}
            value={internalFieldsData.based}
            change = {(val)=> setFieldData('based',val)}
          />        
        </Segment.Group>

        <Segment>Банковские реквизиты</Segment>
        <Segment>
          <Form.Field>
              <label>{bankNameRender()}</label>
              <ReactDadataBox 
              token="a677c0dcff5cd2767c0aa85a6793f5430a3be34a" 
              type="bank"
              placeholder="БИК"
              onChange={bankSelected} 
              query={bankName ? bankName : ''}
              />
          </Form.Field>     
        </Segment>
        
          {bankName && (
                    <Transition
                      transitionOnMount={true}
                      duration={800}
                      visible={!!bankName}
                      
                    >
                      <Segment>
                        <Segment.Group>
                          <Segment>
                            <Form.Field>
                                <label>Адрес</label>
                                <input 
                                disabled={true}
                                value={bankDetails.address}
                                />
                            </Form.Field>   
                          </Segment>
                          <Segment.Group horizontal>
                            <Segment>
                              <Form.Field>
                                  <label>БИК</label>
                                  <input 
                                  disabled={true}
                                  value={bankDetails.bik}
                                  />
                              </Form.Field>                          
                            </Segment>
                            <Segment>
                              <Form.Field>
                                  <label>к/с</label>
                                  <input 
                                  disabled={true}
                                  value={bankDetails.corr}
                                  />
                              </Form.Field>                    
                            </Segment>
                          </Segment.Group>

                          <MaskedAccountNum
                          label={'Расчетный счет'}
                          placeholder={'Укажите номер расчетного счета'}
                          value={bankDetails.account}
                          componentComplete = {setLastFieldComplete}
                          change = {(val)=> setFieldData('rs',validRS(val))}                          
                          ></MaskedAccountNum>

                        </Segment.Group>
                      </Segment>
                    </Transition>
                      )
          }
        
                                                                                                    
      </Segment.Group>
    </Segment.Group>            
  );
}

  export default RequiredFields;

