import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPurchasedColumnToCart1668965505786
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cart',
      new TableColumn({
        name: 'purchased',
        isNullable: false,
        type: 'boolean',
        default: 'false'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cart', 'purchased');
  }
}
