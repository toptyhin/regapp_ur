import React, {useState} from "react";
import {Button, Checkbox, Form, Icon, Segment, Transition, List} from "semantic-ui-react";
import {IMaskInput} from 'react-imask';

const Cards = (props) =>{

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [current, setCurrent] = useState('');
    const [inputComplete, setInputComplete] = useState(false);
    const [cards, setCards] = useState([]);

    const handleCheckbox = (e,d)=>{
        setOpen(d.checked)
    }

    const checkCard = (v,m) => {
        try {
        queryCardNumber(v) 
            .then(e=>e.json())
            .then(json=>{
                if (json.status === 'ok' && cards.indexOf(m._value) === -1) {
                    setInputComplete(true);
                    setError(false);
                    setCurrent(m._value);
                } else {
                    if (cards.indexOf(m._value) !== -1) {
                        setError(true);
                        setErrorText(' Вы уже ввели эту карту');
                    } else {
                        setError(true);
                        setErrorText('Недействительный номер карты');
                    }
                }
            })
        } catch (err) {
            setError(true);
            setErrorText('Не могу проверить карту, попробуйте через минутку');            
        }

    }

    const addCard = () => {
        if (current !=='' && inputComplete && cards.indexOf(current) === -1) {
            let arr = [...cards];
            arr.push(current)
            props.passValue(arr);
            setCards(arr)
        }
    }

    const resetError = (v,m)=>{
        if (error) {
            setError(false);
            setInputComplete(false);
        } else {
            if (m._value.length < current.length || m._value === '') {
                setInputComplete(false);
            }
        }
    }

    const delCard = (v) => {
        const arr = cards.filter( i => i !== v);
        setCards(arr);
        props.passValue(arr);
    }

    const queryCardNumber = (v) => {
        const url = "https://data.inforkom.ru/api/v1/util/contract/validateCard";
        const query = {
            cardnum: v
        };
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

    const labelText = error ? errorText : 'Введите номер карты :';
    const btnDisabled = error || !inputComplete;
    
    return (
        <Segment>
            <Checkbox
                label='У меня уже есть топливные карты Инфорком'
                onChange={handleCheckbox}
                ></Checkbox>
            <Transition
                visible={open}
                animation="fade"
                duration={500}
                unmountOnHide={true}
            >
                <>
                    <Form.Field className={error ? 'error cardsList':'cardsList'}>
                            <label>{labelText}</label>
                            <div className="mask_action">
                                <IMaskInput 
                                    name='validate num'
                                    // disabled={this.props.disabled}
                                    mask={[{mask:"0000 0000 0000 0000"}, {mask:"000000 00000000 00000"}]}
                                    unmask={true}
                                    placeholder="0000 0000 0000 0000 / 000"
                                    onAccept={
                                        (unmskedValue,value)=>resetError(unmskedValue,value)
                                    }
                                    onComplete={
                                        (unmskedValue,value)=>checkCard(unmskedValue,value)
                                    }
                                />
                                <Button 
                                    icon 
                                    color={error || !inputComplete ? 'grey' : 'olive'}
                                    disabled={btnDisabled}
                                    onClick={addCard}>
                                        <Icon name='add'/>
                                </Button>
                            </div>
                    </Form.Field>       
                    <Transition.Group
                        as={List}
                        duration={200}
                        divided
                        size='medium'
                        verticalAlign='middle'
                        >
                        {cards.map((item) => (
                            <List.Item key={item} className='tini_border'>
                            <List.Content className='flex'>
                                {item}
                                <Icon 
                                color='red'
                                size='small'
                                name='close'
                                onClick={()=>delCard(item)}
                                />
                            </List.Content>
                            </List.Item>
                        ))}
                    </Transition.Group>                    
                </>
            </Transition>
        </Segment>
    )
}
export default Cards