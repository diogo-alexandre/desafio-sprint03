import {MigrationInterface, QueryRunner} from "typeorm";

export class createWallets1641615782278 implements MigrationInterface {
    name = 'createWallets1641615782278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wallets\` (\`address\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`cpf\` char(14) NOT NULL, \`birthdate\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c5c912895014feb7be618a6278\` (\`cpf\`), PRIMARY KEY (\`address\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c5c912895014feb7be618a6278\` ON \`wallets\``);
        await queryRunner.query(`DROP TABLE \`wallets\``);
    }

}
