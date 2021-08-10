import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Message,
  Transition,
  Grid,
  ButtonGroup,
  List,
} from "semantic-ui-react";
import AppContext from "./appContext";
import ModalContract from "../Modal/contract";
import LkSteps from "./lkSteps";
import SearchAddress from "./searchAddress.js";
import ChildList from "./childList";
import RegisterChooser from "./registerChooser";
import PlusMinusInput from "./plusMinus";
import Cards from "./cards"
import {IMaskInput} from 'react-imask';
import RequiredFields from './requiredFields';



export default class FormLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agree: false,
      dadataSearchValue: "",
      step: 1,
      foundData: false,
      datalist: false,
      phone: undefined,
      email: undefined,
      confirmation: "",
      pendingConfirmation: false,
      contactConfirmed: false,
      validInput: false,
      dadata: {},
      error: {
        mailInput: false,
        telInput: false,
      },
      cardsNum: 1,
      cardsList: [],
      address: {},
      contractReady: false,
      contractError: '',
      lkData: {},
      innExists: false,
      processingRequest: false,
      contractno: 0,
      companyDetails: {},
      docoptions: [
        {key: 'dd',value: 'dd', text:'Контур Диадок'},
        {key: 'tz',value: 'tz', text:'ТЕЗИС'},
        {key: 'log',value: 'log', text:'Логика СЭД'},
        {key: 'oth',value: 'oth', text:'Другая', active: true},
      ],
    };
    this.searchResults = [];

    this.confirmContract = this.confirmContract.bind(this);
    this.getContract = this.getContract.bind(this);
    this.setCompanyDetails = this.setCompanyDetails.bind(this);

    this.components = {
      foo: Segment,
      Message: Message,
    };

  }

  render() {

    const {
      agree,
      pendingConfirmation,
      contactConfirmed,
      step,
      foundData,
      datalist,
      email,
      phone,
      validInput,
      innExists,
      processingRequest,
      cardsNum,
      docoptions,
      companyDetails,
    } = this.state;

    const contextSate = {
      state: this.state,
      setAddress: (address) => {
        this.setState({ address: address });
      },
    };
    
    let confirmBtnDisabled = true;

    if (agree) {
        if (phone !== undefined && phone !== "" && companyDetails.docsystem !== '') {
          confirmBtnDisabled = false;
        }
    }

    const getActiveDocoptions = ()=>{
      const act = docoptions.filter(e => {
        return !!e.active;
      });
      return act[0]
    }

    const setActiveDocoptions = (k, {key,value})=>{
      const doc = docoptions.map(e=>{
        e.active = e.value === value;
        e.active && this.setCompanyDetails('docsystem',e.value === 'oth' ? '':e.text)
        return e;
      })
      this.setState({docoptions: doc})
    }

    const docSystemFreeType = () => getActiveDocoptions().value === 'oth';

    let privateData = (<Segment><h2>Договор не зарегистрирован</h2></Segment>);

    if (this.state.contractReady && this.state.contractError === '') {
      privateData = (
        <Segment>
          <Message
          header="ШАГ 4"
          positive
          attached
          content='Информация пользователя топливных карт ИНФОРКОМ'
          >
          </Message>          
          <List className="userdata">
            <List.Item>
              <List.Header>Личный кабинет</List.Header>
            </List.Item>
            <List.Item>
              <List.Description>Адрес - <a href={this.state.lkData.link}>{this.state.lkData.link}</a></List.Description>
            </List.Item>       
            <List.Item>
              <List.Description>Логин - {this.state.lkData.login}</List.Description>
            </List.Item>       
            <List.Item>
              <List.Description>Пароль - {this.state.lkData.password}</List.Description>
            </List.Item>                   
            <List.Item>
              <List.Header>Документы</List.Header>
            </List.Item>    
            <List.Item>
              <List.Description><span onClick={this.getContract}>Скачать договор</span></List.Description>
            </List.Item>    
          </List>
        </Segment>);
    }
    if (this.state.contractReady && this.state.contractError !== '') {
      privateData = (
        <Segment>
          <Message
          header="ШАГ 4"
          negative
          attached
          content={this.state.contractError}
          >
          </Message>
        </Segment>
      );
    }

    const searchAddressBlock = cardsNum > this.state.cardsList.length 
        ? (<SearchAddress setSelected={this.setValue.bind(this)} />) 
        : '';

    return (
      <Grid>
        <Grid.Row>
          <LkSteps
            active={step}
            onClick={this.setStep.bind(this)}
            completed={foundData}
          ></LkSteps>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <AppContext.Provider value={contextSate}>
              <Form>
                {step === 1 && (
                  <Transition
                    transitionOnMount={true}
                    animation="fly left"
                    duration={500}
                  >
                    <Segment raised>
                      <Message
                        header="ШАГ 1"
                        content="Необходимые реквизиты. Введите ИНН компаии или ИП"
                      />

                      <Form.Input
                        action={{
                          content: "Найти",
                          onClick: () => this.askDadata(),
                        }}
                        label="ИНН"
                        name="dadataSearchValue"
                        placeholder="Введите ваш ИНН"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            this.setState({ 
                              dadata: {},
                              innExists: false,
                              foundData: false,
                              dadataSearchValue: false
                            });
                          } else {
                            this.setState({
                              dadataSearchValue: e.target.value.replace(/\s/g,''),
                            });
                          }
                        }}
                      ></Form.Input>
                      <Transition
                        visible={innExists}
                        animation='fade'
                        duration={500}
                      >
                          <Message
                          negative
                          content="У нас уже есть договор с этим юр.лицом"
                          >

                          </Message>
                      </Transition>
                      <Transition
                        visible={(foundData || datalist) && step === 1}
                        animation="fade"
                        duration={500}
                      >
                        <Segment>
                          {this.renderDadata()}
                          
                          <Button
                            fluid
                            loading={processingRequest}
                            color="orange"
                            disabled={!foundData || innExists}
                            onClick={() => {
                              this.setState({processingRequest:true})
                              this.isNewContract()
                                .then(c_resp => c_resp.json())
                                .then(cr=>{
                                  this.setState({processingRequest:false})
                                  switch (cr.status) {
                                    case 'OK':
                                      this.setState({innExists:false})
                                      console.log(this.state)
                                      this.setStep(2);
                                      break; 
                                      case 'WARNING':
                                        this.setState({innExists:true})
                                        break;                                       
                                      default:
                                        this.setState({innExists:true})                                         
                                  }
                                })
                                

                            }}
                          >
                            Все верно
                          </Button>
                        </Segment>
                      </Transition>
                    </Segment>
                  </Transition>
                )}
                {step === 2 && (
                  <Transition
                    transitionOnMount={true}
                    animation="fly left"
                    duration={500}
                  >
                    <Segment raised disabled={!foundData}>
                      <Message
                        header="ШАГ 2"
                        content="Необходимо дополнить обязательные поля для договора"
                      />
                      <RequiredFields
                        dadata = {this.state.dadata}
                        passData = {this.setCompanyDetails}
                      />
                      <Button
                        fluid
                        color="orange"
                        disabled={!this.сompanyDetailsComplete()}
                        // onClick={() => this.checkMail()}
                        onClick={() => this.setStep(3)}
                      >
                        OK
                      </Button>
                    </Segment>
                  </Transition>
                )}
                {step === 3 && (
                  <Transition
                    transitionOnMount={true}
                    animation="fly left"
                    duration={500}
                  >
                    <Segment raised disabled={!this.сompanyDetailsComplete()}>
                      <Message
                        header="ШАГ 3"
                        attached
                        content="Уточнить данные по топливным картам"
                      />
                      <Segment>

                      <Cards
                          passValue={(v) => 
                            this.setState({
                              cardsList: v,
                              cardsNum: v.length > cardsNum ? v.length : cardsNum
                            })
                          }
                        />

                        <PlusMinusInput
                          name="cardsNum"
                          min={1}
                          max={5}
                          preset={this.state.cardsList.length}
                          passVal={this.setValue.bind(this)}
                        />
                        
                        {searchAddressBlock}
                        <Form.Select
                          fluid
                          label='Cистема документооборота'
                          options={docoptions}
                          onChange={setActiveDocoptions}
                        />
                        <Transition
                          visible={docSystemFreeType()}
                          animation="scale"
                          duration={500}
                        >
                           <Form.Input 
                            fluid 
                            label='Другая:' 
                            placeholder='Введите название'
                            value={companyDetails.docsystem ? companyDetails.docsystem : ''} 
                            onChange={(e,{name,value})=>{
                              this.setCompanyDetails('docsystem',value)
                            }}
                            />
                        </Transition>
                        

                        <Form.Field>
                        <label>{"Введите номер телефона"}<span class="required">*</span></label>
                        <IMaskInput 
                            name={'contact_phone'}
                            mask={"+{7} 000 000-00-00"}
                            unmask={true}
                            placeholder={"+7 999 999-99-99"}
                            onComplete={
                              (unmskedValue)=>{
                                this.setState({
                                  phone: unmskedValue
                                })
                              }
                            }
                        />
                        </Form.Field>     


                        <Form.Checkbox
                          label="Все данные внесены верно"
                          defaultChecked={false}
                          onChange={(e) => {
                            let prevState = e.target.parentElement.querySelector(
                              "input"
                            ).checked;
                            this.setState({ agree: !prevState });
                          }}
                        />
                        <ButtonGroup fluid>

                          <ModalContract
                            active={this.state.address !== ""}
                          ></ModalContract>
                          <Button
                            disabled={confirmBtnDisabled}
                            color={confirmBtnDisabled ? "grey" : "orange"}
                            onClick={this.confirmContract}
                          >
                            Подтвердить
                          </Button>
                        </ButtonGroup>
                      </Segment>
                    </Segment>
                  </Transition>
                )}
                {step === 4 && (
                  <Transition
                    transitionOnMount={true}
                    animation="fly left"
                    duration={500}
                  >
                    {privateData}
                  </Transition>
                )}
              </Form>
            </AppContext.Provider>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  setStep(num) {
    this.setState({ step: num });
  }

  askDadata(e) {
    const val = this.state.dadataSearchValue;
    if (!val) return;
    const url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    const token = "a677c0dcff5cd2767c0aa85a6793f5430a3be34a";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: val }),
    };
    fetch(url, options)
      .then((response) => response.text())
      .then((result) => {
        this.searchResults = JSON.parse(result).suggestions;
        if (this.searchResults.length) {
          if (this.searchResults.length === 1) {
            this.setFoundCompany(this.searchResults[0], true);
          } else {
            this.setFoundCompany(this.searchResults, false);
          }
        } else {
          this.setState({ foundData: false });
        }
      });
  }

  setFoundCompany(rec, found) {
    if (Array.isArray(rec)) {
      let ddata = [];
      let main = rec.filter((r) => r.data.branch_type === "MAIN");
      rec.map((r) => {
        ddata.push({
          name: r.value,
          name_list: r.data.name,
          address: r.data.address.unrestricted_value,
          address_obj: r.data.address.data,
          inn: r.data.inn,
          kpp: r.data.kpp,
          ogrn: r.data.ogrn,
          okpo: main[0].data.okpo ? main[0].data.okpo : r.data.okpo,
          okved: main[0].data.okved ? main[0].data.okved : r.data.okved,
          management: r.data.management,
          type: r.data.type,
        });
      });
      this.setState({
        datalist: true,
        dadata: ddata,
      });
    } else {
      const {
        companyDetails,
        other
      } = this.state; 
      companyDetails.fio = rec.data ? rec.data.ogrn : rec.ogrn;
      companyDetails.ogrn = rec.data ? rec.data.ogrn : rec.ogrn;
      companyDetails.okpo = rec.data ? rec.data.okpo : rec.okpo;
      companyDetails.okved = rec.data ? rec.data.okpo : rec.okpo;
      if (rec.data && rec.data.management) {
      companyDetails.fio = rec.data.management.name ? rec.data.management.name : '';
      }
      this.setState({
        foundData: found,
        dadata: {
          name: rec["value"] ? rec["value"] : rec.name,
          name_list: rec.data ? rec.data.name : rec.name_list,
          address: rec.data ? rec.data.address.unrestricted_value : rec.address,
          address_obj: rec.data ? rec.data.address.data : rec.address_obj,
          inn: rec.data ? rec.data.inn : rec.inn,
          kpp: rec.data ? rec.data.kpp : rec.kpp,
          ogrn: rec.data ? rec.data.ogrn : rec.ogrn,
          okpo: rec.data ? rec.data.okpo : rec.okpo,
          okved: rec.data ? rec.data.okved : rec.okved,
          management: rec.data ? rec.data.management : rec.management,
          type: rec.data ? rec.data.type : rec.type,
        },
      });

    }
  }

  renderDadata() {
    if (Array.isArray(this.state.dadata)) {
      return (
        <div>
          <label>Какой именно филиал:</label>
          <ChildList>
            {() =>
              this.state.dadata.map((d, i) => (
                <div
                  className="item"
                  key={"comp" + i}
                  onClick={() => {
                    this.setFoundCompany(d, true);
                  }}
                >
                  <span className="name">{d.name}</span>
                  <span className="code">ИНН {d.inn}</span>
                  <span className="address">{d.address}</span>
                </div>
              ))
            }
          </ChildList>
        </div>
      );
    } else {
      if (!Object.keys(this.state.dadata).length) return null;
      let kpp = this.state.dadata.kpp ? (
        <p key="kpp">
          <b>КПП: </b> {this.state.dadata.kpp}
        </p>
      ) : (
        ""
      );
      return (
        <>
          <p key="name">
            <b> {this.state.dadata.name}</b>
          </p>
          <p key="address"> {this.state.dadata.address}</p>
          <p key="inn">
            <b>ИНН: </b> {this.state.dadata.inn}
          </p>
          {kpp}
          <p key="ogrn">
            <b>ОГРН: </b> {this.state.dadata.ogrn}
          </p>
        </>
      );
    }
  }


  getContract() {
    const query = {
      email: this.state.email ? this.state.email : '',
      phone: this.state.phone ? this.state.phone : '',
      docno: this.state.lkData.docno,
      docdate: this.state.lkData.docdate,
      delivery_address: this.state.address,
      cardsNum: this.state.cardsNum,
      cardsList: this.state.cardsList.map(e=>e.replace(/\s/g,'')),
      org: this.state.dadata,
      details: this.state.companyDetails
    }

    const url = "https://data.inforkom.ru/api/v1/util/contract/document";
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(query)
    }
    fetch(url, options)
    .then(response => response.blob())
    .then(blob=>{
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = "contract.docx";
      document.body.appendChild(a);
      a.click();    
      a.remove();
      window.URL.revokeObjectURL(url);
    })     
  }

  confirmContract() {
    const query = {
      email: this.state.email ? this.state.email : '',
      phone: this.state.phone ? this.state.phone : '',
      delivery_address: this.state.address,
      cardsNum: this.state.cardsNum,
      cardsList: this.state.cardsList.map(e=>e.replace(/\s/g,'')),
      org: this.state.dadata,
      details: this.state.companyDetails
    }

    const url = "https://data.inforkom.ru/api/v1/util/contract/confirm";
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(query)
    }    
    fetch(url, options)
    .then(response => response.json())
    .then(obj=>{
      if (obj.status === 'ok') {
        this.setState({
          contractReady: true,
          contractError: obj.error,
          lkData: {
            login: obj.login,
            password: obj.password,
            link: obj.link,
            docno: obj.docno,
            docdate: obj.docdate,
            cid: obj.cid
          }
        })
        this.setStep(4)
      }
    })
  }

  setValue = (e, n) => {
    let st = {};
    st[n.name] = n.value;
    this.setState(st);
  };
  setUnmaskedValue = (val, name) => {
    let st = {};
    st[name] = val;
    this.setState(st);
  };

  isNewContract = () => {
    let query = {};
    if (this.state.foundData && this.state.dadata.inn) query.inn = this.state.dadata.inn;
    if (this.state.foundData && this.state.dadata.kpp) query.kpp = this.state.dadata.kpp;
    const url = "https://data.inforkom.ru/api/v1/util/contract/checkInn";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(query),
    };    
    return fetch(url,options)
  }

  setCompanyDetails = (key,val) => {
    const {
      companyDetails,
      other
    } = this.state;
    companyDetails[key] = val;
    this.setState({
      companyDetails: companyDetails
    })
  }

  сompanyDetailsComplete = () => {
    const required = ['fio','fioi','position', 'positiona', 'based', 'baseda', 'ogrn','bank','bik','ks','rs','baddress'];
    const {
      companyDetails,
      other
    } = this.state;    
    for (let name of required) {
      if (!companyDetails[name] || companyDetails[name] === '') {
        return false;
      }
    }
    return true;
  }
}
