import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import AppContext from '../Form/appContext'

const ModalContract = (props) => {
  
  const [open, setOpen] = React.useState(false);
  const [html, setHtml] = React.useState('');
  const {state} = React.useContext(AppContext)

  const contractText  = () => {
    setOpen(true)

    const query = {
      email: state.email ? state.email : '',
      phone: state.phone ? state.phone : '',
      address: state.address,
      details: {
        fio: state.companyDetails.fio,
        fioi: state.companyDetails.fioi,
        position: state.companyDetails.position,
        positiona: state.companyDetails.positiona,
        based: state.companyDetails.based,
        baseda: state.companyDetails.baseda,
        bik: state.companyDetails.bik,
        bank: state.companyDetails.bank,
        ks: state.companyDetails.ks,
        rs: state.companyDetails.rs,
      },
      org: state.dadata,
      with_data: true,
      cardsList: state.cardsList,
      cardsNum: state.cardsNum
    }

    const url = "https://data.inforkom.ru/api/v1/util/contract";
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(query)
    }    
    fetch(url, options)
    .then(response => response.json())
    .then(obj=>{
      if (obj.status === 'ok') {
        setHtml(obj.html)
      }
    })
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => contractText()}
      trigger={
        <Button basic disabled={!props.active} color={props.active ? 'orange': 'grey'}>Прочитать договор</Button>
      }
    >
      <Modal.Header>Договор</Modal.Header>
      <Modal.Content scrolling>
    <Modal.Description><div dangerouslySetInnerHTML={{__html:html}}></div></Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          OK <Icon name='chevron right' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalContract