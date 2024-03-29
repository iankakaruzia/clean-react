import React from 'react'
import { useRecoilValue } from 'recoil'
import { SurveyResultAnswerModel } from '@/domain/models'
import { onSurveyAnswerState } from '@/presentation/pages/survey-result/components'

import Styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }

  return (
    <li
      onClick={answerClick}
      data-testid='answer-wrap'
      className={[Styles.answerWrap, activeClassName].join(' ')}
    >
      {answer.image && (
        <img data-testid='image' src={answer.image} alt={answer.answer} />
      )}
      <span data-testid='answer' className={Styles.answer}>
        {answer.answer}
      </span>
      <span data-testid='percent' className={Styles.percent}>
        {answer.percent}%
      </span>
    </li>
  )
}

export default Answer
