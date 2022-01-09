import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixTables1641706761323 implements MigrationInterface {
    name = 'fixTables1641706761323'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `transactions` DROP FOREIGN KEY `FK_b74d389eff682da2eddb3b5c176`');
      await queryRunner.query('ALTER TABLE `transactions` DROP FOREIGN KEY `FK_eff425dfc65aba334a78a0d5829`');
      await queryRunner.query('ALTER TABLE `transactions` DROP COLUMN `receiveFromAddress`');
      await queryRunner.query('ALTER TABLE `transactions` DROP COLUMN `sendToAddress`');
      await queryRunner.query('ALTER TABLE `transactions` ADD `sendTo` varchar(255) NOT NULL');
      await queryRunner.query('ALTER TABLE `transactions` ADD `receiveFrom` varchar(255) NOT NULL');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `transactions` DROP COLUMN `receiveFrom`');
      await queryRunner.query('ALTER TABLE `transactions` DROP COLUMN `sendTo`');
      await queryRunner.query('ALTER TABLE `transactions` ADD `sendToAddress` varchar(36) NULL');
      await queryRunner.query('ALTER TABLE `transactions` ADD `receiveFromAddress` varchar(36) NULL');
      await queryRunner.query('ALTER TABLE `transactions` ADD CONSTRAINT `FK_eff425dfc65aba334a78a0d5829` FOREIGN KEY (`receiveFromAddress`) REFERENCES `wallets`(`address`) ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE `transactions` ADD CONSTRAINT `FK_b74d389eff682da2eddb3b5c176` FOREIGN KEY (`sendToAddress`) REFERENCES `wallets`(`address`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
}
