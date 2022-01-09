import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTransactions1641668746786 implements MigrationInterface {
    name = 'createTransactions1641668746786'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `transactions` (`id` int NOT NULL AUTO_INCREMENT, `value` double NOT NULL, `currentCotation` double NOT NULL, `datetime` datetime NOT NULL, `coinId` int NULL, `sendToAddress` varchar(36) NULL, `receiveFromAddress` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
      await queryRunner.query('ALTER TABLE `transactions` ADD CONSTRAINT `FK_cc96c459a7271dbae857cdace07` FOREIGN KEY (`coinId`) REFERENCES `coins`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `transactions` ADD CONSTRAINT `FK_b74d389eff682da2eddb3b5c176` FOREIGN KEY (`sendToAddress`) REFERENCES `wallets`(`address`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `transactions` ADD CONSTRAINT `FK_eff425dfc65aba334a78a0d5829` FOREIGN KEY (`receiveFromAddress`) REFERENCES `wallets`(`address`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `transactions` DROP FOREIGN KEY `FK_eff425dfc65aba334a78a0d5829`');
      await queryRunner.query('ALTER TABLE `transactions` DROP FOREIGN KEY `FK_b74d389eff682da2eddb3b5c176`');
      await queryRunner.query('ALTER TABLE `transactions` DROP FOREIGN KEY `FK_cc96c459a7271dbae857cdace07`');
      await queryRunner.query('DROP TABLE `transactions`');
    }
}
