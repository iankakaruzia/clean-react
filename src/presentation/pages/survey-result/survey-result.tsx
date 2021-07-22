import React, { useState, useEffect } from 'react'

import { Header, Footer, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import {
  SurveyResultData,
  SurveyResultContext
} from '@/presentation/pages/survey-result/components'

import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult
}) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => ({
      ...oldState,
      surveyResult: null,
      isLoading: false,
      error: error.message
    }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState((oldState) => ({ ...oldState, isLoading: true }))
    saveSurveyResult
      .save({ answer })
      .then((surveyResult) =>
        setState((old) => ({ ...old, isLoading: false, surveyResult }))
      )
      .catch(handleError)
  }

  const reload = (): void =>
    setState((oldState) => ({
      ...oldState,
      error: '',
      reload: !oldState.reload
    }))

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
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid='survey-result' className={Styles.contentWrap}>
          {state.surveyResult && (
            <SurveyResultData surveyResult={state.surveyResult} />
          )}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
