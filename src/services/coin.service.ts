import { Repository } from 'typeorm';
import { Coin } from '../entities/coin.entity';
import { ICoinDTO } from '../entities/DTO/coin.dto';
import { Catch } from '../helpers/decorators/catch.decorator';
import { validate } from '../helpers/validate.helper';
import { ICoinService } from './interfaces/coin-service.interface';

export class CoinService implements ICoinService {
  private readonly coinRepository: Repository<Coin>

  constructor (coinRepository: Repository<Coin>) {
    this.coinRepository = coinRepository;
  }

  @Catch()
  async create ({ wallet, coin, fullname, amont }: ICoinDTO): Promise<Coin> {
    const entity = new Coin(coin, fullname, amont, wallet);
    await validate(entity);

    return await this.coinRepository.save(entity);
  }

  @Catch()
  async update (coin: Coin): Promise<Coin> {
    return await this.coinRepository.save(coin);
  }
}
