import React, { useEffect, useState } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Header, Footer } from '@/presentation/components'
import { SurveyContext, SurveyError, SurveyListItem } from '@/presentation/pages/survey-list/components'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }))
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? (
            <SurveyError />
          ) : (
            <SurveyListItem />
          )}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
