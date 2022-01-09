export class InsufficientFunds extends Error {
  constructor (coin: string) {
    super(`Você não possuí fundos suficiente na moeda ${coin} para fazer a operação.`);
  }
}
