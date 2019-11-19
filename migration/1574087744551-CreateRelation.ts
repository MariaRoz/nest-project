import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class CreateRelation1574087744551 implements MigrationInterface {

    private foreignKey = new TableForeignKey({
        columnNames: ['authorId'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'users',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('messages', new TableColumn({
            name: 'authorId',
            type: 'int',
            isNullable: false,
        }));
        await queryRunner.createForeignKey('messages', this.foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('messages', 'authorId');
        await queryRunner.dropForeignKey('messages', this.foreignKey);
    }

}
