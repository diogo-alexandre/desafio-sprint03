import {MigrationInterface, QueryRunner} from "typeorm";

export class createCoins1641662767904 implements MigrationInterface {
    name = 'createCoins1641662767904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`coins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`coin\` char(3) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`amont\` double NOT NULL, \`walletAddress\` varchar(36) NULL, UNIQUE INDEX \`IDX_20a1f5abbf016ab9a024b6a6fb\` (\`coin\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`coins\` ADD CONSTRAINT \`FK_a46c869c31504f268b237f3fa2c\` FOREIGN KEY (\`walletAddress\`) REFERENCES \`wallets\`(\`address\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coins\` DROP FOREIGN KEY \`FK_a46c869c31504f268b237f3fa2c\``);
        await queryRunner.query(`DROP INDEX \`IDX_20a1f5abbf016ab9a024b6a6fb\` ON \`coins\``);
        await queryRunner.query(`DROP TABLE \`coins\``);
    }

}
