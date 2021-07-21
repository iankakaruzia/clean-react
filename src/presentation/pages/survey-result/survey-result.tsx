import React, { useState, useEffect } from 'react'

import { Header, Footer, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'

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
          <SurveyResultData surveyResult={state.surveyResult} />
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
