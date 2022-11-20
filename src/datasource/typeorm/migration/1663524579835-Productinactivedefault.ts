import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ProductInactiveDefault1663524579835
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'inactive',
      new TableColumn({
        name: 'inactive',
        type: 'boolean',
        isNullable: false,
        default: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
