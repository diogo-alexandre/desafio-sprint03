import { Coin } from '../../entities/coin.entity';
import { ICoinDTO } from '../../entities/DTO/coin.dto';

export interface ICoinService {
  create (coin: ICoinDTO): Promise<Coin>
  update (coin: Coin): Promise<Coin>
}
