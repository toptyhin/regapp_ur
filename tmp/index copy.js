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
      confirmationError: false,
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
    };
    this.searchResults = [];

    this.renderData = "";

    this.confirmContract = this.confirmContract.bind(this);
    this.getContract = this.getContract.bind(this);

    this.components = {
      foo: Segment,
      Message: Message,
    };

  }

  componentDidMount() {
    fetch("https://data.inforkom.ru/api/v1/util/reactx", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // this.renderData = result.component == 'Message' ? (<Message content={result.content}></Message>):'';
        const TagName = this.components[result.component || "foo"];
        this.renderData = <TagName content={result.content} />;
        // let TagName = result.component;
        // this.renderData = (<TagName content={result.content}/>);
      });
  }

  render() {

    console.log(this.state);

    const {
      agree,
      confirmationError,
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
    } = this.state;

    let btnText = pendingConfirmation ? "Подтвердить код" : "Проверить";
    const contextSate = {
      state: this.state,
      setAddress: (address) => {
        this.setState({ address: address });
      },
    };
    
    let confirmBtnDisabled = true;
    if (agree) {
      if (this.state.cardsList.length === this.state.cardsNum || Object.keys(this.state.address).length > 0) {
        confirmBtnDisabled = false;
      }
    }

    if (confirmationError) btnText = "Прислать код еще раз";

    let privateData = (<Segment><h2>Вы еще не зарегестрированы</h2></Segment>);

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
          <List>
            <List.Item>
              <List.Header>Адрес личного кабинета</List.Header>
              <a href={this.state.lkData.link}>{this.state.lkData.link}</a>
            </List.Item>
            <List.Item>
              <List.Header>Логин</List.Header>
              <p>{this.state.lkData.login}</p>
            </List.Item>            
            <List.Item>
              <List.Header>Пароль</List.Header>
              <p>{this.state.lkData.password}</p>
            </List.Item>            
            <List.Item>
              <List.Header>Инструкция пользователя</List.Header>
              <p></p>
            </List.Item>                        
            <List.Item>
              <List.Header onClick={this.getContract}>Скачать договор</List.Header>
              <p></p>
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
        <Grid.Row>{this.renderData}</Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            {/* <AppContext.Provider value={this.contextSate}> */}
            <AppContext.Provider value={contextSate}>
              <Form>
                {step === 1 && (
                  <Transition
                    transitionOnMount={true}
                    animation="fly left"
                    duration={500}
                  >
                    <Segment raised>
                      <Button onClick={this.getContract}></Button>
                      <Message
                        header="ШАГ 1"
                        content="Необходимо реквизиты. Введите ИНН компаии или ИП"
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
                              dadataSearchValue: e.target.value,
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
                          content="У нас уже есть договор"
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
                        content="Необходимо подтвердить контактные данные"
                      />
                      <Transition
                        unmountOnHide={true}
                        visible={phone === undefined || phone === ""}
                        animation="scale"
                        duration={500}
                      >
                        <RegisterChooser
                          name="email"
                          message="Регистрация по адресу электронной почты"
                          errorText=""
                          label="Введите адрес эл.почты"
                          placeholder="name@domen.ru"
                          disabled={!foundData}
                          passValue={this.setValue.bind(this)}
                          codePending={pendingConfirmation}
                          confirmationError={confirmationError}
                          // confirmationValue={confirmation}
                          confirmationLabel="Введите код поддтерждения из письма"
                        ></RegisterChooser>
                      </Transition>
                      <Transition
                        unmountOnHide={true}
                        visible={email === undefined || email === ""}
                        animation="scale"
                        duration={500}
                      >
                        <RegisterChooser
                          name="phone"
                          message="Регистрация по номеру мобильного телефона"
                          errorText=""
                          label="Введите номер телефона"
                          placeholder="+7 999 999-99-99"
                          mask={"+{7} 000 000-00-00"}
                          unmask={true}
                          disabled={!foundData}
                          passValue={this.setUnmaskedValue.bind(this)}
                          codePending={pendingConfirmation}
                          confirmationError={confirmationError}
                          // confirmationValue={confirmation}
                          confirmationLabel="Введите код поддтерждения из СМС"
                        ></RegisterChooser>
                      </Transition>

                      <Button
                        fluid
                        color="orange"
                        disabled={!foundData || !validInput}
                        onClick={() => this.checkMail()}
                      >
                        {btnText}
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
                    <Segment raised disabled={!contactConfirmed}>
                      <Message
                        header="ШАГ 3"
                        attached
                        content="Ознакомится с условиями договора. Скачать договор"
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

                       
                        <Form.Checkbox
                          label="Я согласен с условиями договора"
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
    // const val = this.state.dadataSearchValue || "402908858870";
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

  // codeInput = (e) => {
  //   console.log(e, e.target)
  // }


  checkMail() {
    let query = {};
    if (this.state.email) query.email = this.state.email;
    if (this.state.phone) query.phone = this.state.phone;
    if (this.state.confirmation) query.code = this.state.confirmation;
    const url = "https://data.inforkom.ru/api/v1/util/contacts";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(query),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.codePending) {
          this.setState({
            pendingConfirmation: true,
            confirmationError: false,
          });
        }
        if (result.success === true && result.contractno) {
          this.setState({
            pendingConfirmation: false,
            confirmationError: false,
            contactConfirmed: true,
            step: 3,
            contractno: result.contractno
          });
        }
        if (result.success === false) {
          this.setState({
            pendingConfirmation: false,
            confirmationError: true,
            contactConfirmed: false,
            confirmation: "",
          });
        }

        // const data = JSON.parse(result);
        // if (data.suggestions.length){
        //     const rec = data.suggestions[0];
        //     this.setState({
        //         foundData: true,
        //         dadata: {
        //             name: rec.value,
        //             address: rec.data.address.unrestricted_value,
        //             inn: rec.data.inn,
        //             ogrn: rec.data.ogrn,
        //             okpo: rec.data.okpo,
        //             okved: rec.data.okved
        //         }
        //      })
        // } else {
        //     this.setState({foundData:false})
        // }
      });
  }

  getContract() {
    console.log("confirm", this.state);
    const query = {
      email: this.state.email ? this.state.email : '',
      phone: this.state.phone ? this.state.phone : '',
      delivery_address: this.state.address,
      cardsNum: this.state.cardsNum,
      cardsList: this.state.cardsList.map(e=>e.replace(/\s/g,'')),
      org: this.state.dadata
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
    .then(response => response.json())
    .then(t=>{
      console.log(t)
      // const doc = new jsPDF();
      // doc.text(t.text,10,10);
      // doc.save("XXX.pdf");

    //   doc.html(t.text, {
    //     callback: function (doc) {
    //       doc.save("XXX.pdf");
    //     },
    //     x: 10,
    //     y: 10
    //  });


    })     
  }

  confirmContract() {
    console.log("confirm", this.state);
    const query = {
      email: this.state.email ? this.state.email : '',
      phone: this.state.phone ? this.state.phone : '',
      delivery_address: this.state.address,
      cardsNum: this.state.cardsNum,
      cardsList: this.state.cardsList.map(e=>e.replace(/\s/g,'')),
      org: this.state.dadata
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

  // setStateFromValue = prop => (e) => {
  //     console.log(prop,e)
  // }

  // setStateFromValue = prop => ({target:{value}}) => {
  //     this.setState({[prop]: value})
  // }
}
