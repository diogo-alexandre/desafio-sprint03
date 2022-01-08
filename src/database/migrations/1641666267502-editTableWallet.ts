import { MigrationInterface, QueryRunner } from 'typeorm';

export class editTableWallet1641666267502 implements MigrationInterface {
    name = 'editTableWallet1641666267502'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `wallets` ADD `deletedAt` datetime(6) NULL');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `wallets` DROP COLUMN `deletedAt`');
    }
}
