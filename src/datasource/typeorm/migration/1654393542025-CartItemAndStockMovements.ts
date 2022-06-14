import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class CartItemAndStockMovements1654393542025
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart',
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
            type: 'varchar'
          },
          {
            name: 'id_user_address',
            type: 'varchar'
          },
          {
            name: 'date_purchased',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted',
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

    await queryRunner.createForeignKey(
      'cart',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      })
    );

    await queryRunner.createForeignKey(
      'cart',
      new TableForeignKey({
        columnNames: ['id_user_address'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_address'
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'stock_movement',
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
            name: 'quantity',
            type: 'integer'
          },
          {
            name: 'date_movement',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'cart_item',
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
            name: 'id_cart',
            type: 'varchar'
          },
          {
            name: 'quantity',
            type: 'integer'
          },
          {
            name: 'id_stock_movement',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'numeric'
          },
          {
            name: 'final_price',
            type: 'numeric'
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
      'cart_item',
      new TableForeignKey({
        columnNames: ['id_product'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product'
      })
    );

    await queryRunner.createForeignKey(
      'cart_item',
      new TableForeignKey({
        columnNames: ['id_cart'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cart'
      })
    );

    await queryRunner.createForeignKey(
      'cart_item',
      new TableForeignKey({
        columnNames: ['id_stock_movement'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stock_movement'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const cartItemTable = await queryRunner.getTable('cart_item');

    if (cartItemTable) {
      const productForeignKey = cartItemTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_product') !== -1
      );

      if (productForeignKey) {
        await queryRunner.dropForeignKey('cart_item', productForeignKey);
      }

      const cartForeignKey = cartItemTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_cart') !== -1
      );

      if (cartForeignKey) {
        await queryRunner.dropForeignKey('cart_item', cartForeignKey);
      }

      const stockMovementKey = cartItemTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_stock_movement') !== -1
      );

      if (stockMovementKey)
        await queryRunner.dropForeignKey('cart_item', stockMovementKey);
    }

    await queryRunner.dropTable('cart_item');

    const stockMovementTable = await queryRunner.getTable('stock_movement');

    if (stockMovementTable) {
      const productForeignKey = stockMovementTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_product') !== -1
      );

      if (productForeignKey) {
        await queryRunner.dropForeignKey('stock_movement', productForeignKey);
      }
    }

    await queryRunner.dropTable('stock_movement');

    const cartTable = await queryRunner.getTable('cart');
    if (cartTable) {
      const userForeignKey = cartTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_user') !== -1
      );

      if (userForeignKey)
        await queryRunner.dropForeignKey('cart', userForeignKey);

      const userAddressForeignKey = cartTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_user_address') !== -1
      );

      if (userAddressForeignKey)
        await queryRunner.dropForeignKey('cart', userAddressForeignKey);
    }

    await queryRunner.dropTable('cart');
  }
}
