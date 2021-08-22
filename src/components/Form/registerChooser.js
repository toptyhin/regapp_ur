// import React, {Component} from 'react'
import {Component} from 'react'
// import {IMaskInput} from 'react-imask';
import { Segment, Form, Transition, Message} from 'semantic-ui-react'
import CodeConfirmation from './codeConfirmation'

export default class RegisterChooser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            codePending: false,
            confirmationError: false,
            email:'',
            mailConfirmed: false,
        };
        this.validateInput = this.validateInput.bind(this);
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    

    validateInput(e,d) 
    {
        
        if (!this.props.name) return false;

        const mcheck = ()=>{
                const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
                return !emailRegex.test(d.value);
        };
        const tcheck = ()=>{
            const elvnDgs = /^\d{11}$/;
            return !elvnDgs.test(d.value);
        };  
        
        let error = false;
        if (this.props.name === 'email') {
            error = mcheck();
            this.setState({error:error})
            this.props.passValue(null,{
                    name:'email',
                    value: d.value
            });
            this.props.passValue(null,{
                name: 'validInput',
                value: !error
            });             
        }
        // if (this.props.name === 'phone') {
        //     error = tcheck();
        //     this.setState({error:error})
        //     this.props.passValue(d.value,'phone');
        //     this.props.passValue(!error, 'validInput');
        // }        

    }

    sendConfirmationCode () 
    {
        const query = {
            email: this.state.email,
        }
      
          const url = "https://data.inforkom.ru/api/v1/util/contacts";
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
              console.log(obj);
            if (obj.codePending) {
              this.setState({
                codePending: true,
              })
            }
          })        
    }

    checkConfirmationCode (code)
    {
        const query = {
            email: this.state.email,
            code: code
        }
      
          const url = "https://data.inforkom.ru/api/v1/util/contacts";
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
            if (obj.success) {
              this.setState({
                codePending: false,
                mailConfirmed: true,
              });
              this.props.passValue(null,{
                name:'emailConfirmed',
                value: true
              });              
              this.props.passValue(null,{
                name:'email',
                value: this.state.email
              });              
            } else {
                this.setState({
                    confirmationError: true,
                    mailConfirmed: false,
                  });
            }
          })            
    }

    render() {
        
        const {
            error,
            email,
            codePending,
            confirmationError,
            mailConfirmed
        } = this.state;
        
        return (
            <Segment>
                {this.props.message && 
                    <Message header={this.props.message} />
                }
                {/* {this.props.mask && 
                    <Form.Field className={error ? 'error':''}>
                        <label>{this.props.label}</label>
                        <IMaskInput 
                            name={this.props.name} 
                            disabled={this.props.disabled}
                            mask={this.props.mask}
                            unmask={this.props.unmask}
                            placeholder={this.props.placeholder} 
                            onAccept={
                            (unmskedValue)=>this.validateInput(null,{value:unmskedValue})
                            }
                        />
                    </Form.Field>                        
                } */}

                {!this.props.mask &&                      
                // <Form.Input 
                //     error={error}
                //     label={error ? this.props.errorText : this.props.label}
                //     name={this.props.name} 
                //     placeholder={this.props.placeholder} 
                //     disabled={this.props.disabled}
                //     onChange={this.validateInput}
                //     >
                // </Form.Input>
                    // <Form onSubmit={this.checkConfirmationCode}>
                    <Form.Group>
                        <Form.Input
                            // error={error}
                            placeholder={this.props.placeholder} 
                            name={this.props.name} 
                            value={email}
                            onChange={this.handleChange}
                        />
                        <Form.Button 
                            color= {(mailConfirmed ? 'green' : 'orange')}
                            disabled = {mailConfirmed}
                            content = {(mailConfirmed ? 'Адрес подтвержден' : 'Подтвердить')}
                            onClick={this.sendConfirmationCode.bind(this)}
                        />
                    </Form.Group>
                // </Form>


                }
                <Transition visible={confirmationError} animation='fade up' duration={500}>
                    <Message
                    color="red"
                    header="Ошибка"
                    content="Код введен ошибочно. Повторите запрос кода"
                    />     
                </Transition>                                               
                <Transition visible={codePending} animation='fade up' duration={500}>
                    <Segment>
                        {/* <Form.Input 
                            label={this.props.confirmationLabel} 
                            name='confirmation' 
                            placeholder='Код подтверждения' 
                            // value = {confirmationValue}
                            onChange={this.props.passValue}>
                        </Form.Input> */}

                        <CodeConfirmation
                        numberItems={4}
                        riseValue={(value)=>this.checkConfirmationCode(value)}
                      ></CodeConfirmation>


                    </Segment>
                </Transition>                                               
            </Segment>            
        )
    }
}