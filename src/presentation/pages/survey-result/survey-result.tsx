import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Header, Footer, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import {
  SurveyResultData,
  surveyResultState,
  onSurveyAnswerState
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

  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

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

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

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
