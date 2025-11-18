import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1758665026032 implements MigrationInterface {
  name = 'Migrations1758665026032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` varchar(255) NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` varchar(255) NOT NULL`,
    );
  }
}
