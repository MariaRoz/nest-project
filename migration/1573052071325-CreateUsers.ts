import { Column, MigrationInterface, PrimaryGeneratedColumn, QueryRunner, Table } from 'typeorm';

export class CreateUsers1573052071325 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: false,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'now()',
                },
            ],
        }), true);
    }
    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users');
    }
}
