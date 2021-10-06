import React, { useState } from "react";
import {
    Form,
    Segment,
    Transition,
  } from "semantic-ui-react";

  import ReactDadataBox from 'react-dadata-box';
  import RFSegment from './requiredFieldsSegment';
  import MaskedAccountNum from "./maskedAccountNum";
  

const RequiredFields = (props) => {

  const [bankName, setBankName] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    address:'',
    bik:'',
    inn:'',
    name:'',
    corr:'',
    account:''
  });

  const [lastFieldComplete, setLastFieldComplete] = useState(false);

  const getManagement = () => props.dadata.management && props.dadata.management.name ? props.dadata.management.name : '';
  
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


  const [internalFieldsData, setInternalFieldsData] = useState(
    {
      'fio': getManagement(),
      'fioi': '',
      'position': '',
      'positiona': '',
      'based': '',
      'baseda': '',
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
        <RFSegment 
          label={'Подписант ФИО в родительном падеже'}
          placeholder={'Иванова Ивана Ивановича'}
          // hasError = {lastFieldComplete && internalFieldsData.fioi === ''}
          hasError = {errorField('fioi')}
          // hasError = {internalFieldsData.fioi === ''}
          value={''}
          change = {(val)=> setFieldData('fioi',val)}
        />
        </Segment.Group>
        <Segment.Group horizontal>
        <RFSegment 
          label={'Должность'}
          placeholder={'Директор'}
          // hasError = {lastFieldComplete && internalFieldsData.position === ''}
          hasError = {errorField('position')}
          value={''}
          change = {(val)=> {
            // setPosa(val);
            setFieldData('position',val);
          }}
        />
        <RFSegment 
          label={'Должность в р.п.'}
          placeholder={'Директора'}
          // hasError = {lastFieldComplete && internalFieldsData.positiona === ''}
          hasError = {errorField('positiona')}
          value={''}
          change = {(val)=> setFieldData('positiona',val)}
        />
        </Segment.Group>
        <Segment.Group horizontal>
        <RFSegment 
          label={'Основание'}
          placeholder={'Устав / Доверенность от 00.00.2021'}
          // hasError = {lastFieldComplete && internalFieldsData.based === ''}
          hasError = {errorField('based')}
          value={''}
          change = {(val)=> setFieldData('based',val)}
        />        
        <RFSegment 
          label={'Основание в р.п.'}
          placeholder={'Устава / Доверенности от 00.00.2021'}
          // hasError = {lastFieldComplete && internalFieldsData.baseda === ''}
          hasError = {errorField('baseda')}
          value={''}
          change = {(val)=> setFieldData('baseda',val)}
        />                
        </Segment.Group>
        {/* <Segment.Group horizontal>
          <RFSegment 
            label={'ИНН'}
            placeholder={'ИНН'}
            value={(props.dadata.inn ? props.dadata.inn : '')}
            change = {(val)=> setFieldData('inn',val)}
          />             
          <RFSegment 
            label={'КПП'}
            placeholder={'КПП'}
            value={(props.dadata.kpp ? props.dadata.kpp : '')}
            change = {(val)=> setFieldData('kpp',val)}
          />             
        </Segment.Group> */}
        {/* <Segment.Group horizontal>
          <RFSegment 
            label={'ОГРН'}
            placeholder={'ОГРН'}
            value={(props.dadata.ogrn ? props.dadata.ogrn : '')}
            change = {(val)=> setFieldData('ogrn',val)}
          />                       
          <RFSegment 
            label={'ОКПО'}
            placeholder={'ОКПО'}
            value={(props.dadata.okpo ? props.dadata.okpo : '')}
            change = {(val)=> setFieldData('okpo',val)}
          />         
          <RFSegment 
            label={'ОКВЭД'}
            placeholder={'ОКВЭД'}
            value={(props.dadata.okved ? props.dadata.okved :'')}
            change = {(val)=> setFieldData('okved',val)}
          />                                 
        </Segment.Group> */}
        <Segment>Банковские реквизиты</Segment>
        <Segment>
          <Form.Field>
              <label>{bankNameRender()}</label>
              <ReactDadataBox 
              token="a677c0dcff5cd2767c0aa85a6793f5430a3be34a" 
              type="bank"
              placeholder="БИК"
              onChange={bankSelected} 
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

                          {/* <RFSegment 
                            label={'Расчетный счет'}
                            placeholder={'Укажите номер расчетного счета'}
                            error_message={'В номере расчетного счета должно быть 20 цифр'}
                            value={''}
                            change = {(val)=> setFieldData('rs',validRS(val))}
                            validator = {(e)=>!!e.match(/^\d{20}$/)}
                          />  */}

                          <MaskedAccountNum
                          label={'Расчетный счет'}
                          placeholder={'Укажите номер расчетного счета'}
                          value={''}
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

