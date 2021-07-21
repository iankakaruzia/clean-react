import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FlipMove from 'react-flip-move'
import {
  Header,
  Footer,
  Loading,
  Calendar,
  Error
} from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => ({
      ...oldState,
      error: error.message,
      surveyResult: null
    }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const reload = (): void => {
    setState((oldState) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !oldState.reload
    }))
  }

  const { goBack } = useHistory()

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) =>
        setState((oldState) => ({ ...oldState, surveyResult }))
      )
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid='question'>{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid='answers' className={Styles.answersList}>
              {state.surveyResult.answers.map((answer) => {
                const className = answer.isCurrentAccountAnswer
                  ? Styles.active
                  : ''
                return (
                  <li
                    data-testid='answer-wrap'
                    key={answer.answer}
                    className={className}
                  >
                    {answer.image && (
                      <img
                        data-testid='image'
                        src={answer.image}
                        alt={answer.answer}
                      />
                    )}
                    <span data-testid='answer' className={Styles.answer}>
                      {answer.answer}
                    </span>
                    <span data-testid='percent' className={Styles.percent}>
                      {answer.percent}%
                    </span>
                  </li>
                )
              })}
            </FlipMove>
            <button data-testid='back-button' onClick={goBack}>
              Voltar
            </button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
