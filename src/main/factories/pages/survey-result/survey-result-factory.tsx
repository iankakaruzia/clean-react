import React from 'react'
import { useParams } from 'react-router-dom'
import {
  makeRemoteLoadSurveyResult,
  makeRemoteSaveSurveyResult
} from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'

type Params = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<Params>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
