import React, { useState } from "react";
import {Form, Segment} from "semantic-ui-react";
import {IMaskInput} from 'react-imask';


  const MaskedAccountNum = (props) => {
    const {label, change, componentComplete, placeholder, error_message = 'Поле незаполнено'} = props
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);
    const [complete, setComplete] = useState(false);
    const [val, setVal] = useState(props.value);
    const getColor = () => {
        if (active && complete) {
            return 'green';
        }
        return active ? 'blue' : complete ? 'green' : error ? 'red' : 'grey'
    }
    const setStates = () => {
        setComplete(true);
        setError(false);
        change(val);
        componentComplete(true);
    }
    // const handleChange = (e) => {
    //     // change(e.target.value);
    //     setVal(e.target.value);
    // }

    const handleChange2 = (e) => {
        setComplete(false);
        setActive(true);
        setVal(e);
    }    

    const handleBlur = () => {
        setActive(false);
        !complete && setError(true);
    }
    
    // const validate = (e) => {
    //     setActive(false);
    //         if (!e.target.value) {
    //             setError(true);
    //         } else {
    //             setError(false);
    //             setComplete(true);
    //         }
    // }

    return (
        <Segment color={getColor()}>
        <Form.Field error={error}>
        <label>{"Укажите номер расчетного счета"}<span className="required">*</span></label>
        <IMaskInput 
            name={'000 00 000 0 0000 0000000'}
            mask={"000  00  000  0  0000  0000000"}
            unmask={true}
            value={val}
            placeholder={placeholder}
            onBlur={handleBlur}
            onAccept={handleChange2}
            onComplete={
              (unmskedValue)=>{
                setStates()
                // console.log('unmasked', unmskedValue)
              }
            }
        />
        </Form.Field>                              
        </Segment>        
    )
  }

  export default MaskedAccountNum;