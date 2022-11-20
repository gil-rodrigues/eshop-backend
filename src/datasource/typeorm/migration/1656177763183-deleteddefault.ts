import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class deletedDefault1656177763183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cart',
      'deleted',
      new TableColumn({
        name: 'deleted',
        type: 'boolean',
        isNullable: false,
        default: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
