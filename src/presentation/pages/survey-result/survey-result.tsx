import React from 'react'
import FlipMove from 'react-flip-move'
import { Header, Footer, Spinner } from '@/presentation/components'
import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img
              src='https://fordevs.herokuapp.com/static/img/logo-react.png'
              alt='ReactJS'
            />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img
              src='https://fordevs.herokuapp.com/static/img/logo-react.png'
              alt='ReactJS'
            />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img
              src='https://fordevs.herokuapp.com/static/img/logo-react.png'
              alt='ReactJS'
            />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult