import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1758675867895 implements MigrationInterface {
    name = 'Migrations1758675867895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_8f5f60efe1ef2847c1f36302f1f\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_2320cee7a393cf21d47ce3db753\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD \`projectId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_8f5f60efe1ef2847c1f36302f1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_2320cee7a393cf21d47ce3db753\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_2320cee7a393cf21d47ce3db753\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP FOREIGN KEY \`FK_8f5f60efe1ef2847c1f36302f1f\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD \`projectId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_2320cee7a393cf21d47ce3db753\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_projects\` ADD CONSTRAINT \`FK_8f5f60efe1ef2847c1f36302f1f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
