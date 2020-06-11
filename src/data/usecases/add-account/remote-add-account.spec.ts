import faker from 'faker'
import { RemoteAddAccount } from './remote-add-account'
import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { mockAddAccount } from '@/domain/test'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccount())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccount()
    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })
})