import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class deleteName1572280722497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('messages', 'name');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('messages', new TableColumn({
            name: 'name',
            type: 'varchar',
        }));
    }

}
