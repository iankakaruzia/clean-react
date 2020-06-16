import { HttpGetClient } from '@/data/protocols/http'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<SurveyModel> {
    await this.httpGetClient.get({ url: this.url })
    return null
  }
}
