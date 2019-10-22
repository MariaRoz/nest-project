import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateTable1571746210099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('messages', new TableColumn({
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
        }));
        await queryRunner.changeColumn('messages', 'id', new TableColumn({
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('messages', 'createdAt');
        await queryRunner.changeColumn('messages', 'id', new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
        }) );
    }

}
