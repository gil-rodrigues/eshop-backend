import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class AddressType1653241583550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address_type',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'code',
            type: 'varchar'
          },
          {
            name: 'description',
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
        columnNames: ['id_address_type'],
        referencedColumnNames: ['id'],
        referencedTableName: 'address_type'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_address');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_address_type') !== -1
      );

      if (foreignKey)
        await queryRunner.dropForeignKey('user_address', foreignKey);
    }

    await queryRunner.dropTable('address_type');
  }
}
