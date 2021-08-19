import React from 'react'
import {
    Segment,
    Message,
    List,
  } from "semantic-ui-react";

import PdfLink from './pdflink';

const PrivateData = (props) => {

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
          header="ШАГ 4"
          positive
          attached
          content='Информация пользователя топливных карт ИНФОРКОМ'
          >
          </Message>          
          <List className="userdata">
            <List.Item>
              <List.Header>Личный кабинет</List.Header>
            </List.Item>
            <List.Item>
              <List.Description>Адрес - <a href={props.lkData.link}>{props.lkData.link}</a></List.Description>
            </List.Item>       
            <List.Item>
              <List.Description>Логин - {props.lkData.login}</List.Description>
            </List.Item>       
            <List.Item>
              <List.Description>Пароль - {props.lkData.password}</List.Description>
            </List.Item>                   
            <List.Item>
              <List.Header>Документы</List.Header>
            </List.Item>    
            <List.Item>
              <List.Description>
                  <PdfLink data={props.documentData} />
              </List.Description>
            </List.Item>    
          </List>
        </Segment>);
    } else {
        return (<Segment><h2>Договор не зарегистрирован</h2></Segment>);
    }
}

export default PrivateData;