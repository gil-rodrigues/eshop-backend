import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class AddUserAddress1653220613277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_address',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'id_user',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'address',
            type: 'varchar'
          },
          {
            name: 'local',
            type: 'varchar'
          },
          {
            name: 'postal_code',
            type: 'varchar'
          },
          {
            name: 'region',
            type: 'varchar'
          },
          {
            name: 'country',
            type: 'varchar'
          },
          {
            name: 'id_address_type',
            type: 'varchar'
          },
          {
            name: 'inactive',
            type: 'boolean',
            default: 'false'
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

    await queryRunner.createForeignKey(
      'user_address',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_address');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_user') !== -1
      );

      if (foreignKey)
        await queryRunner.dropForeignKey('user_address', foreignKey);
    }

    await queryRunner.dropTable('user_address');
  }
}
