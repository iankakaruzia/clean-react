export class InvalidFieldError extends Error {
  constructor() {
    super('Valor Inválido')
    this.name = 'InvalidFieldError'
  }
}
