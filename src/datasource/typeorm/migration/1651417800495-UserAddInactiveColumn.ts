import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UserAddInactiveColumn1651417800495
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'inactive',
        type: 'boolean',
        default: 'false'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'inactive');
  }
}
