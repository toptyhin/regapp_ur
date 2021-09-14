import React, { useState } from "react";
import {Form, Segment} from "semantic-ui-react";
import {IMaskInput} from 'react-imask';


  const MaskedAccountNum = (props) => {
    const {label, placeholder, error_message = 'Поле незаполнено'} = props
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);
    const [complete, setComplete] = useState(false);
    const [val, setVal] = useState('');
    const getColor = () => {
        return active ? 'blue' : complete ? 'green' : error ? 'red' : 'grey'
    }
    const setStates = () => {
        console.log(val)
        if (val.length === 20) {
            setComplete(true)
            setError(false)
        } else {
            setComplete(false)
            setError(true);
        }
    }
    const handleChange = (e) => {
        // change(e.target.value);
        setVal(e.target.value);
    }
    
    const validate = (e) => {
        setActive(false);
            if (!e.target.value) {
                setError(true);
            } else {
                setError(false);
                setComplete(true);
            }
        // passBlurEvent && passBlurEvent();
    }

    return (
        <Segment color={getColor()}>
        <Form.Field error={error}>
        <label>{"Укажите номер расчетного счета"}<span className="required">*</span></label>
        <IMaskInput 
            name={'000 00 000 0 0000 0000000'}
            mask={"000  00  000  0  0000  0000000"}
            unmask={true}
            placeholder={placeholder}
            onFocus={setActive}
            onBlur={setStates}
            onAccept={setVal}
            onComplete={
              (unmskedValue)=>{
                setStates()
                // setComplete(true);
                // setComplete(true);
                // setError(false);
                // setVal(unmskedValue);
                console.log('unmasked', unmskedValue)
                // this.setState({
                //   phone: unmskedValue
                // })
              }
            }
        />
        </Form.Field>                              
        </Segment>        
    )
  }

  export default MaskedAccountNum;