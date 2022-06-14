import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class CartAndProducts1654392210646
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create language table
    await queryRunner.createTable(
      new Table({
        name: 'language',
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
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'name',
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

    // create product table
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'price',
            type: 'integer'
          },
          {
            name: 'discount_price',
            type: 'integer'
          },
          {
            name: 'inactive',
            type: 'boolean'
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

    // create product designation table

    await queryRunner.createTable(
      new Table({
        name: 'product_designation',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'id_product',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'code_lang',
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

    await queryRunner.createForeignKey(
      'product_designation',
      new TableForeignKey({
        columnNames: ['id_product'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product'
      })
    );

    await queryRunner.createForeignKey(
      'product_designation',
      new TableForeignKey({
        columnNames: ['code_lang'],
        referencedColumnNames: ['code'],
        referencedTableName: 'language'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product_designation');
    if (table) {
      const foreignKeyProduct = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_product') !== -1
      );

      if (foreignKeyProduct)
        await queryRunner.dropForeignKey(
          'product_designation',
          foreignKeyProduct
        );

      const foreignKeyLanguage = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('code_lang') !== -1
      );

      if (foreignKeyLanguage)
        await queryRunner.dropForeignKey(
          'product_designation',
          foreignKeyLanguage
        );
    }

    await queryRunner.dropTable('product_designation');

    await queryRunner.dropTable('product');

    await queryRunner.dropTable('language');
  }
}
