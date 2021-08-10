// import React, {Component} from 'react'
import {Component} from 'react'
import {IMaskInput} from 'react-imask';
import { Segment, Form, Transition, Message} from 'semantic-ui-react'
import CodeConfirmation from './codeConfirmation'

export default class RegisterChooser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.validateInput = this.validateInput.bind(this);
    }

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
        if (this.props.name === 'phone') {
            error = tcheck();
            this.setState({error:error})
            this.props.passValue(d.value,'phone');
            this.props.passValue(!error, 'validInput');
        }        

    }

    render() {
        
        const {
            error
        } = this.state;
        
        return (
            <Segment>
                {this.props.message && 
                    <Message header={this.props.message} />
                }
                {this.props.mask && 
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
                }

                {!this.props.mask &&                      
                <Form.Input 
                    error={error}
                    label={error ? this.props.errorText : this.props.label}
                    name={this.props.name} 
                    placeholder={this.props.placeholder} 
                    disabled={this.props.disabled}
                    onChange={this.validateInput}
                    >
                </Form.Input>
                }
                <Transition visible={this.props.confirmationError} animation='fade up' duration={500}>
                    <Message
                    color="red"
                    header="Ошибка"
                    content="Код введен ошибочно. Повторите запрос кода"
                    />     
                </Transition>                                               
                <Transition visible={this.props.codePending} animation='fade up' duration={500}>
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
                        riseValue={(value)=>this.props.passValue(null,{
                          name:'confirmation',
                          value: value
                        })}
                      ></CodeConfirmation>


                    </Segment>
                </Transition>                                               
            </Segment>            
        )
    }
}