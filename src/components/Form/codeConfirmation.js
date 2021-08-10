import React from 'react'

const CodeConfirmation = (props) => {

    const inp = (_props) => (<input name="confirmation[]" key={_props.key} data-num={_props.id} onKeyUp={codeInput} type="text"/>)
    const makeChilds = () => {
        return [...Array(props.numberItems).keys()].map((e,i)=>{
            return inp({
                key:'cinp_'+i,
                id: i
            });
        })
    }
    const confCode = new Array(props.numberItems);

    const codeInput = (e)=>{
        const {target} = e;
        const num = target.dataset.num;
        if (e.keyCode === 8 && parseInt(num) !== 0) {
            target.previousElementSibling.focus();
            confCode[num]=target.value;
            return;
        }
    
        if (!target.value.match(/^\d{1}$/)) {
            if (parseInt(num) === props.numberItems-1) {
                target.value = e.key;
                return;    
            }
            target.value = '';
            confCode[num]=target.value;
            return;
        }
    
        if (target.value.length === 1 && num < props.numberItems-1) {
            confCode[num]=target.value;
            target.nextElementSibling.focus();
        }

        if (target.value.length === 1 && parseInt(num) === props.numberItems-1) {
            confCode[num]=target.value;
            if (confCode.filter(i=> i.match(/\d/)).length === props.numberItems) {
                props.riseValue(confCode.join(''));
            }
        }
    }    

    return (
        <div className="field">
        <label>Введите код поддтерждения из письма</label>
            <div className="ui ccode">
                {makeChilds()}
            </div>
        </div>
    );
}

export default CodeConfirmation;
