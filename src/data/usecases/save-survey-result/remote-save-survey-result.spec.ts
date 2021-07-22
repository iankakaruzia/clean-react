import faker from 'faker'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { mockSaveSurveyResultParams } from '@/domain/test'
import { AccessDeniedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
  })

  it('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
