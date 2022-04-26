import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Initial1649514407003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'salt',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'cellphone_number',
            type: 'varchar'
          },
          {
            name: 'date_created',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'date_modified',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
