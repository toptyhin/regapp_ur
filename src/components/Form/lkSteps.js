import {Component} from 'react'
import './steps.css'

export default class LkSteps extends Component {

  render() {
    // let step = this.props.active;
    // let completed = this.props.completed;

    const {active,completed} = this.props;



    return (
      <nav className="sixteen wide column">  
        <div className="steps_container">
          <div className="steps">
            <div 
              className={`step ${active === 1 ? "active" :""} ${active>1 && completed ? "completed" :""}`}
              onClick={()=>{this.props.onClick(1)}}
            >
              <span className="breadcrumb__inner">
                <span className="breadcrumb__title">Компания</span>
                <span className="breadcrumb__desc">Поиск компании по ИНН</span>
              </span>
            </div>
            <div 
              className={`step ${active === 2 ? "active" :""} ${active>2 && completed ? "completed" :""}`}
              onClick={()=>{this.props.onClick(2)}}
            >
              <span className="breadcrumb__inner">
                <span className="breadcrumb__title">Реквизиты</span>
                <span className="breadcrumb__desc">Контактная Информация</span>
              </span>
            </div>
            <div 
              className={`step ${active === 3 ? "active" :""} ${active>3 && completed ? "completed" :""}`}
              onClick={()=>{this.props.onClick(3)}}
            >
              <span className="breadcrumb__inner">
                <span className="breadcrumb__title">Договор</span>
              </span>
            </div>
            <div 
              className={`step ${active === 4 ? "active" :""} ${active>4 ? "completed" :""}`}
              onClick={()=>{this.props.onClick(4)}}
            >
              <span className="breadcrumb__inner">
                <span className="breadcrumb__title">Личный кабинет</span>
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }  
}