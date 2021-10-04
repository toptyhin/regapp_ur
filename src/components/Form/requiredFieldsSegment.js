import React, { useState } from "react";
import {Form, Segment,Message } from "semantic-ui-react";

const RFSegment = (props) => {

    const {label, placeholder, value, passBlurEvent = false, hasError, change, validator = false, error_message = 'Поле незаполнено'} = props
    const [active, setActive] = useState(false);
    const [error, setError] = useState(hasError);
    const [complete, setComplete] = useState(!!value);
    const [val, setVal] = useState(value);
    console.log('label / error ', label, error);
    const getColor = () => {
        return active ? 'blue' : complete ? 'green' : error ? 'red' : 'grey'
    }
    const handleChange = (e) => {
        change(e.target.value);
        setVal(e.target.value);
       
    }

    const validate = (e) => {
        setActive(false);
        if (validator) {

            if (validator(e.target.value)) {
                setError(false);
                setComplete(true);
            } else {
                setError(true);
            }
        } else {
            if (!e.target.value) {
                setError(true);
            } else {
                setError(false);
                setComplete(true);
            }
        }
        passBlurEvent && passBlurEvent();
    }

    // const renderError = () => {
    //     if (error) {
    //     return (
    //         <Message
    //         color='orange'
    //         header='Ошибка'
    //         content={error_message}
    //     />          
    //     )
    //     } else {
    //         return null;
    //     }
    // };


    return (
        <Segment color={getColor()}>
        <Form.Field error={error}>
          <label>{label}</label>
          {/* {renderError()} */}
          <input 
          placeholder={placeholder}
          value={val}
          onFocus={setActive}
          onBlur={validate}
          onChange={handleChange}
          />
        </Form.Field>
        </Segment>        
    )
}

export default RFSegment;