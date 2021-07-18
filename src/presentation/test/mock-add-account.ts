import { AddAccount } from '@/domain/usecases'
import { mockAddAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  callsCount = 0
  params: AddAccount.Params

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
