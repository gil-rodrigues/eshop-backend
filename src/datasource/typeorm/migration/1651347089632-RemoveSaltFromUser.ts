import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveSaltFromUser1651347089632
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'salt');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'salt',
        type: 'varchar'
      })
    );
  }
}
