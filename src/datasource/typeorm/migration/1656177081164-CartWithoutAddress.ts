import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export default class CartWithoutAddress1656177081164
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cartTable = await queryRunner.getTable('cart');

    if (cartTable) {
      const cartForeignKey = cartTable.foreignKeys.find(
        fk => fk.columnNames.indexOf('id_user_address') !== -1
      );

      if (cartForeignKey) {
        await queryRunner.dropForeignKey('cart', cartForeignKey);
      }

      await queryRunner.changeColumn(
        'cart',
        'id_user_address',
        new TableColumn({
          name: 'id_user_address',
          type: 'varchar',
          isNullable: true
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
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
