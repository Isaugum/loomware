import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758674566618 implements MigrationInterface {
    name = 'Migrations1758674566618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_8f5f60efe1ef2847c1f36302f1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_2320cee7a393cf21d47ce3db753\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_2320cee7a393cf21d47ce3db753\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_8f5f60efe1ef2847c1f36302f1f\``);
        await queryRunner.query(`DROP TABLE \`user_projects\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
    }

}
