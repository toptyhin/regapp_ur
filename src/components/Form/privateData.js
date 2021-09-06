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
            <List.Item key={'li_lk'}>
              <List.Header>Личный кабинет</List.Header>
            </List.Item>
            <List.Item  key={'li_lk_address'}>
              <List.Description>Адрес - <a href={props.lkData.link}>{props.lkData.link}</a> Личный кабинет будет сформирован в течение 15-20 минут.</List.Description>
            </List.Item>       
            <List.Item  key={'li_lk_login'}>
              <List.Description>Логин - {props.lkData.login}</List.Description>
            </List.Item>       
            <List.Item  key={'li_lk_pwd'}>
              <List.Description>Пароль - {props.lkData.password}</List.Description>
            </List.Item>                   
            <List.Item  key={'li_lk_docs'}>
              <List.Header>Документы</List.Header>
            </List.Item>    
            <List.Item  key={'li_lk_download'}>
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