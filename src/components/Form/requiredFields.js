import React, { useState } from "react";
import {
    Form,
    Segment,
    Transition,
  } from "semantic-ui-react";

  import ReactDadataBox from 'react-dadata-box';
  import RFSegment from './requiredFieldsSegment';

const RequiredFields = (props) => {

  let fieldsData = {};

  const [bankName, setBankName] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    address:'',
    bik:'',
    inn:'',
    name:'',
    corr:'',
    account:''
  });
  // not used
  const [doca, setDoca] = useState('');
  const [openPosa, setOpenPosa] = useState(false);
  const [posa, setPosa] = useState('');
  //*** */

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


  // const setFieldData = (key,val) => fieldsData[key] = val;
  const setFieldData = (key,val) => {
    props.passData(key,val)
  };
  
  const validRS = (num) => {
    if (num.match(/^\d{20}$/)) {
      return num
    } else {
      return '';
    }
  }

  const tryRP = (typ, val) => {
    //not used
    const position = [
      {from:'директор',to:'директора'},
      {from:'Директор',to:'Директора'},
      {from:'генеральный',to:'генерального'},
      {from:'Генеральный',to:'Генерального'},
      {from:'управляющий',to:'управляющего'},
      {from:'Управляющий',to:'Управляющего'},
      {from:'заместитель',to:'заместителя'},
      {from:'Заместитель',to:'Заместителя'},
      {from:'коммерческий',to:'коммерческого'},
      {from:'Коммерческий',to:'Коммерческого'},
      {from:'финансовый',to:'финансового'},
      {from:'Финансовый',to:'Финансового'},
    ];
    const doc = [
      {from:'устав',to:'устава'},
      {from:'Устав',to:'Устава'},
      {from:'приказ',to:'приказа'},
      {from:'Приказ',to:'Приказа'},
      {from:'доверенность',to:'доверенности'},
      {from:'Доверенность',to:'Доверенности'},
    ]    
    const src = typ === 'doc' ? doc : position;
    let str = '';
    val.split(' ').map((s)=>{
      src.map((m)=>{
        if (m.from === s.trim()) {
          s = m.to;
        }
      })
      str += ' '+s;
    })
    if (typ === 'doc') {
      setDoca(str);
    } else {
      setPosa(str)
    }
    
    return val;
  }

const handleBlur = () => {
  setOpenPosa(true);
}

  return (
      <Segment.Group>
      <Segment>{props.dadata.name}</Segment>
      <Segment.Group>
        <Segment.Group horizontal>
        <RFSegment 
          label={'Подписант ФИО'}
          placeholder={'ФИО'}
          value = {getManagement()}
          change = {(val)=> setFieldData('fio',val)}
        />
        <RFSegment 
          label={'Подписант ФИО в родительном падеже'}
          placeholder={'ФИО р.п.'}
          value={''}
          change = {(val)=> setFieldData('fioi',val)}
        />
        </Segment.Group>
        <Segment.Group horizontal>
        <RFSegment 
          label={'Должность'}
          placeholder={'Должность'}
          value={''}
          change = {(val)=> {
            // setPosa(val);
            setFieldData('position',val);
          }}
        />
        <RFSegment 
          label={'Должность в р.п.'}
          placeholder={'Должность в р.п.'}
          value={''}
          change = {(val)=> setFieldData('positiona',val)}
        />
        </Segment.Group>
        <Segment.Group horizontal>
        <RFSegment 
          label={'Основание'}
          placeholder={'Устав / Доверенность от 00.00.2021'}
          value={''}
          change = {(val)=> setFieldData('based',val)}
        />        
        <RFSegment 
          label={'Основание в р.п.'}
          placeholder={'Устава / Доверенности от 00.00.2021'}
          value={''}
          change = {(val)=> setFieldData('baseda',val)}
        />                
        </Segment.Group>
        <Segment.Group horizontal>
          <RFSegment 
            label={'ИНН'}
            placeholder={'ИНН'}
            value={props.dadata.inn}
            change = {(val)=> setFieldData('inn',val)}
          />             
          <RFSegment 
            label={'КПП'}
            placeholder={'КПП'}
            value={props.dadata.kpp}
            change = {(val)=> setFieldData('kpp',val)}
          />             
        </Segment.Group>
        <Segment.Group horizontal>
          <RFSegment 
            label={'ОГРН'}
            placeholder={'ОГРН'}
            value={props.dadata.ogrn}
            change = {(val)=> setFieldData('ogrn',val)}
          />                       
          <RFSegment 
            label={'ОКПО'}
            placeholder={'ОКПО'}
            value={props.dadata.okpo}
            change = {(val)=> setFieldData('okpo',val)}
          />         
          <RFSegment 
            label={'ОКВЭД'}
            placeholder={'ОКВЭД'}
            value={props.dadata.okved}
            change = {(val)=> setFieldData('okved',val)}
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
                          <RFSegment 
                            label={'Расчетный счет'}
                            placeholder={'Укажите номер расчетного счета'}
                            error_message={'В номере расчетного счета должно быть 20 цифр'}
                            value={''}
                            change = {(val)=> setFieldData('rs',validRS(val))}
                            validator = {(e)=>!!e.match(/^\d{20}$/)}
                          />   
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

