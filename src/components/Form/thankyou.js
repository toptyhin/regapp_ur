import React from 'react'
import {
    Segment,
    Message,
    Header,
    Icon,
    Button
  } from "semantic-ui-react";


const ThankYou = (props) => {

    if (props.contractReady && props.contractError !== '') {
        return (
          <Segment>
            <Message
            header="ШАГ 4"
            negative
            attached
            content={props.contractError}
            >
            </Message>
          </Segment>
        );
    }

    if (props.contractReady && props.contractError === '') {
      return (
        <Segment>
          <Message
          header="Регистрация завершена"
          positive
          attached
          content='Договор оформляется'
          >
          </Message>          
          <Segment placeholder>
            <Header icon>
              <Icon name='check circle' color="olive"/>
              Спасибо мы оформляем ваш договор.
            </Header>
            <Button color="olive" onClick={()=>window.location="/"}>OK</Button>
          </Segment>
        </Segment>);
    } else {
        return (<Segment><h2>Договор не зарегистрирован</h2></Segment>);
    }
}

export default ThankYou;