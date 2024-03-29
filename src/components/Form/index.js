import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Message,
  Transition,
  Grid,
  ButtonGroup,
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
import RequiredFields from "./requiredFields"
// import PrivateData from "./privateData";
import ThankYou from "./thankyou";
import Config from "../../config";
import gasoline from "../../50001.png"



export default class FormLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agree: false,
      pdfready: false,
      pdfhtml: undefined,
      dadataSearchValue: "",
      step: 1,
      foundData: false,
      datalist: false,
      phone: undefined,
      email: undefined,
      emailConfirmed: false,
      confirmation: "",
      pendingConfirmation: false,
      contactConfirmed: false,
      validInput: false,
      dadata: {},
      error: {
        mailInput: false,
        telInput: false,
      },
      step3error: {
        address:false,
        docsystem:false,
        phone:false,
        mail:false
      },
      plusMinusVisible: true,
      cardsNum: 1,
      cardsList: [],
      address: {},
      contractReady: false,
      contractError: '',
      lkData: {},
      innExists: false,
      processingRequest: false,
      contractno: 0,
      companyDetails: {
        company:'',
        dira:'',
        doca:'',
        inn:'',
        kpp:'',
        ogrn:'',
        address:'',
        fio:'',
        fioi:'',
        rs:'',
        bik:'',
        bank:'', 
        ks:'',       
      },
      docoptions: [
        {key: 'dd',value: 'dd', text:'Контур Диадок',active: true},
        {key: 'tz',value: 'tz', text:'ТЕЗИС'},
        {key: 'log',value: 'log', text:'Логика СЭД'},
        {key: 'none',value: 'none', text:'Не использую ЭДО'},
        {key: 'oth',value: 'oth', text:'Другая'},
      ],
    };
    this.searchResults = [];

    this.confirmContract = this.confirmContract.bind(this);
    this.getContract = this.getContract.bind(this);
    this.setCompanyDetails = this.setCompanyDetails.bind(this);

  }

  step3FormComplete() {
    const {
      address,
      phone,
      email,
      emailConfirmed,
      step3error,
      companyDetails,
      cardsList,
      docoptions
    } = this.state;    

    let complete = true;
    const err = step3error;

    if (cardsList.length === 0) {

      if (Object.keys(address).length === 0) {
        err.address = true;
        complete = false;
      } else {
        err.address = false;
      }

    }

    const active_docs = docoptions.filter(e => {
      return !!e.active;
    });

    if (active_docs[0].value === 'oth' && !companyDetails.docsystem) {
      err.docsystem = true;
      complete = false;      
    } else {
      err.docsystem = false;
    }

    if (!phone) {
      err.phone = true;
      complete = false;      
    } else {
      err.phone = false;
    }

    if (!email || !emailConfirmed) {
      err.mail = true;
      complete = false;            
    } else {
      err.mail = false;
    }

    this.setState({step3error:err});
    return complete;
  }

  setErrorColor(err) {
    return err ? 'red':'black'
  }

  setErrorClassName(err) {
    return err ? 'redborders':''
  }

  render() {

    const {
      agree,
      step,
      foundData,
      datalist,
      phone,
      innExists,
      processingRequest,
      cardsNum,
      plusMinusVisible,
      step3error,
      companyDetails,
    } = this.state;

    let docoptions = this.state.docoptions;

    const contextSate = {
      state: this.state,
      setAddress: (address) => {
        this.setState({ address: address });
      },
    };

    if (contextSate.state.docsystem) {
      docoptions = docoptions.map(op => op.active = op.text === contextSate.state.docsystem)
    }
    
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
    const isPlusMinusVisible = () => plusMinusVisible;

    const searchAddressBlock = cardsNum > this.state.cardsList.length 
        ? (<SearchAddress setSelected={this.setValue.bind(this)} getColor={this.setErrorColor(step3error.address)} getClassName={this.setErrorClassName(step3error.address)} />) 
        : '';



    return (
      <Grid>
        <Grid.Row>
        <Grid.Column width={16}>
          <div style={{
            borderRadius:'.28571429rem',
            boxShadow: '0 0 0 1px rgb(34 36 38 / 22%) inset, 0 0 0 0 transparent',
            backgroundColor: '#edeff0',
            padding: '16px',
            color: 'rgba(0,0,0,.87)',
            display: 'flex',
            alignItems: 'center'
            }}>
              <img src={gasoline} style={{maxWidth:'80px', marginRight: '20px'}} alt='fs'/>
            <div>
            <p> Здесь вы можете самостоятельно ввести данные для заключения регистрации договора.</p>
            <p> После завершения регистрации договора, мы вышлем Вам необходимое количество топливных карт и Вам будет доступен вход в личный кабинет.</p>
            <p> Можете заправлять свой автопарк на любых АЗС и получать скидки на топливо</p>
            <p> Если у Вас возникли вопросы - позвоните менеджеру +7 495 781-44-44 доб. 4263</p>
            </div>
          </div>
        </Grid.Column>
        </Grid.Row>
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
                        content="Необходимые реквизиты. Введите ИНН компании или ИП"
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
                          content="У нас уже есть договор. Пожалуйста, обратитесь к менеджеру по телефону: +7 495 781-44-44 доб. 4263"
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
                              const step1event = new Event('step1');
                              window.dispatchEvent(step1event);
                              this.isNewContract()
                                .then(c_resp => c_resp.json())
                                .then(cr=>{
                                  this.setState({processingRequest:false})
                                  switch (cr.status) {
                                    case 'OK':
                                      this.setState({innExists:false})
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
                        onClick={() => {
                          const step2event = new Event('step2');
                          window.dispatchEvent(step2event);
                          this.setStep(3)
                        }}
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
                          onCheck={(visible)=>this.setState({plusMinusVisible:visible})}
                      />
                      {isPlusMinusVisible() && (
                      <PlusMinusInput
                            name="cardsNum"
                            min={1}
                            max={5}
                            preset={this.state.cardsList.length}
                            passVal={this.setValue.bind(this)}
                          />
                      )}
                        
                      {searchAddressBlock}

                      <Form.Select
                          fluid
                          label='Cистема документооборота'
                          options={docoptions}
                          onChange={setActiveDocoptions}
                          defaultValue={getActiveDocoptions().key}
                      />
                        <Transition
                          visible={docSystemFreeType()}
                          animation="scale"
                          duration={500}
                        >
                           <Form.Input 
                            fluid 
                            required
                            className={this.setErrorClassName(step3error.docsystem)}
                            // color={this.setErrorColor(this.state.step3error.docsystem)}q
                            label='Другая:' 
                            placeholder='Введите название'
                            value={companyDetails.docsystem ? companyDetails.docsystem : ''} 
                            onChange={(e,{name,value})=>{
                              this.setCompanyDetails('docsystem',value)
                              step3error.docsystem = value === ''
                              // this.setState({step3error:step3error});
                            }}
                            />
                        </Transition>
                        

                        <Form.Field className={this.setErrorClassName(step3error.phone)} >
                        <label>{"Введите номер телефона"}<span className="required">*</span></label>
                        <IMaskInput 
                            name={'contact_phone'}
                            mask={"+{7} 000 000-00-00"}
                            unmask={true}
                            value={contextSate.state.phone ? contextSate.state.phone : ''}
                            placeholder={"+7 999 999-99-99"}
                            onComplete={
                              (unmskedValue)=>{
                                this.setState({
                                  phone: unmskedValue
                                })
                                step3error.phone = false;
                                this.setState({step3error:step3error});
                              }
                            }
                        />
                        </Form.Field>  

                        <Transition
                          visible={!!phone}
                          animation="scale"
                          duration={500}
                        >
                          <RegisterChooser 
                            name = 'email'
                            placeholder = 'name@mail.ru'
                            disabled = {false}
                            value={contextSate.state.email ? contextSate.state.email : ''}
                            passValue = {this.setValue.bind(this)}
                            errorNotification = {step3error.mail}

                          />
                        </Transition>                        
                        

                        <Form.Checkbox
                          label="Все данные внесены верно"
                          checked={agree}
                          onChange={(e) => {
                            if (this.step3FormComplete()) {
                              this.setState({ agree: !agree });  
                            } else {
                            this.setState({ agree: agree });
                            }
                          }}
                        />
                        <ButtonGroup fluid>

                          {/* <ModalContract
                            active={this.state.address !== ""}
                          ></ModalContract> */}
                          <Button
                            disabled={confirmBtnDisabled}
                            color={confirmBtnDisabled ? "grey" : "orange"}
                            onClick={this.confirmContractDryRun.bind(this)}
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
                    <ThankYou 
                      contractReady = {this.state.contractReady}
                      contractError = {this.state.contractError}                    
                    />
                    {/* <PrivateData
                      contractReady = {this.state.contractReady}
                      contractError = {this.state.contractError}
                      lkData = {this.state.lkData}
                      documentData ={{
                        contractno: this.state.lkData.docno,
                        contractdate:this.state.lkData.docdate,
                        company: this.state.companyDetails.name,
                        pos: this.state.companyDetails.position,
                        dira: this.state.companyDetails.positiona,
                        doc: this.state.companyDetails.based,
                        doca: this.state.companyDetails.baseda,
                        orginn: this.state.companyDetails.inn,
                        orgkpp: this.state.companyDetails.kpp,
                        ogrn: this.state.companyDetails.ogrn,
                        address: this.state.companyDetails.address,
                        email: this.state.email,
                        fio: this.state.companyDetails.fio,
                        fioi:this.state.companyDetails.fioi,
                        bankrs: this.state.companyDetails.rs,
                        bik: this.state.companyDetails.bik,
                        bank: this.state.companyDetails.bank,
                        bankks: this.state.companyDetails.ks,
                        phone: this.state.phone,
                        cardsList: this.state.cardsList,
                        cardsNum: this.state.cardsNum
                      }}
                    /> */}
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
      const main = rec.filter((r) => r.data.branch_type === "MAIN");
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
        return false;
      });

      this.setState({
        datalist: true,
        dadata: ddata,
      });
    } else {
      const {companyDetails} = this.state; 
      companyDetails.name = rec.value ? rec.value.replace('\\','') : rec.name.replace('\\',''); 
      companyDetails.inn = rec.data ? rec.data.inn : rec.inn;
      companyDetails.kpp = rec.data ? rec.data.kpp : rec.kpp;
      companyDetails.ogrn = rec.data ? rec.data.ogrn : rec.ogrn;
      companyDetails.okpo = rec.data ? rec.data.okpo : rec.okpo;
      companyDetails.okved = rec.data ? rec.data.okved : rec.okved;
      companyDetails.address = rec.data ? rec.data.address.unrestricted_value : rec.address;
      
      if (rec.data && rec.data.management &&  rec.data.management.name) {
        companyDetails.fio = rec.data.management.name;
      } else {
        if (rec.management && rec.management.name) {
          companyDetails.fio = rec.management.name;
        }
      } 

      this.setState({
        companyDetails : companyDetails,
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


  confirmContractDryRun() {
    const query = {
      email: this.state.email ? this.state.email : '',
      phone: this.state.phone ? this.state.phone : '',
      delivery_address: this.state.address,
      cardsNum: this.state.cardsNum,
      cardsList: this.state.cardsList.map(e=>e.replace(/\s/g,'')),
      org: this.state.dadata,
      details: this.state.companyDetails,
      tarif: Config.tarifid
    }

    const url = "https://data.inforkom.ru/api/v1/util/contract/confirmDryRun";
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
      if (obj.status === 'OK') {
        this.setState({
          contractReady: true,
          contractError: obj.error,
        })
        const step3event = new Event('step3');
        window.dispatchEvent(step3event);        
        this.setStep(4)
      }
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
      details: this.state.companyDetails,
      tarif: Config.tarifid
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
        const step3event = new Event('step3');
        window.dispatchEvent(step3event);        
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
    const {companyDetails} = this.state;
    companyDetails[key] = val;
    this.setState({
      companyDetails: companyDetails
    })
  }

  сompanyDetailsComplete = () => {
    // const required = ['fio','fioi','position', 'positiona', 'based', 'baseda', 'ogrn','bank','bik','ks','rs','baddress'];
    const required = ['fio','position', 'based', 'bank','bik','ks','rs','baddress'];
    const {companyDetails} = this.state;    

    if (companyDetails.rs && companyDetails.rs.replace(/\D+/g,'').length !== 20 ) {
      return false;
    }

    for (let name of required) {
      if (!companyDetails[name] || companyDetails[name] === '') {
        return false;
      }
    }
    return true;
  }
}
