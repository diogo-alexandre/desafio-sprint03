import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCoin1641713468618 implements MigrationInterface {
    name = 'fixCoin1641713468618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_20a1f5abbf016ab9a024b6a6fb\` ON \`coins\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_20a1f5abbf016ab9a024b6a6fb\` ON \`coins\` (\`coin\`)`);
    }

}
