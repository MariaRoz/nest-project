import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PostRefactoring1571661440854 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'messages',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'message',
                    type: 'varchar',
                },
            ],
        }), true);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('messages');
    }
}
