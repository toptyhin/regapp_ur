import React, { useState } from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'

function PlusMinusInput(props) {

    let [current, setCurrent] = useState(props.min ? props.min : 0);
    const [errorMax, setErrorMax] = useState(false);
    const max = props.max ? props.max : Number.POSITIVE_INFINITY;
    const min = props.min ? props.min : Number.NEGATIVE_INFINITY;

    if (props.preset > current) {
        current = props.preset;
    }

    const increase = () => {
        let val = current+1 < max ? current+1 : max;
        setCurrent(val);
        passState(val);
        if (current+1 > max) {
            setErrorMax(true);    
        }
    }
    const decrease = () => {
        let val = current-1 > min ? current-1 : min
        setCurrent(val);
        passState(val);
        setErrorMax(false);
    }    
    const passState = (val) => {
        props.passVal(null,{
            name: props.name,
            value:val
        })
    }

    const labelTxt = errorMax ? 'Максимально можно заказать 5 карт' : 'Уточните количество карт';

    return (
        <div className="field flex">
            <label>{labelTxt}</label>
            <Button.Group>

                <Button compact={true} className='darked' onClick={decrease} >
                    <Icon name='minus'/>
                </Button>
                
                <Input value={current} />
                
                <Button compact={true} className='darked' onClick={increase}>
                    <Icon name='plus'/>
                </Button>

            </Button.Group>
        </div>                
    );
}

export default PlusMinusInput