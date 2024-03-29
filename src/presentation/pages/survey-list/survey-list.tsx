import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { LoadSurveyList } from '@/domain/usecases'
import { Header, Footer, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'

import {
  SurveyListItem,
  surveyListState
} from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => ({ ...oldState, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyListState)

  const reload = (): void => {
    setState((oldState) => ({
      surveys: [],
      error: '',
      reload: !oldState.reload
    }))
  }

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((oldState) => ({ ...oldState, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error ? (
          <Error error={state.error} reload={reload} />
        ) : (
          <SurveyListItem surveys={state.surveys} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
