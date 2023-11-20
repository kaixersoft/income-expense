import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTable1700228985020 implements MigrationInterface {
  name = 'InitTable1700228985020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "description" character varying(255), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_8a300c5ce0f70ed7945e877a537" PRIMARY KEY ("categoryId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accountId" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountType" character varying(150) NOT NULL, "amount" double precision NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying(255) NOT NULL, "categoryId" uuid, CONSTRAINT "PK_03220d8b0ebb79b008b6ec15b3e" PRIMARY KEY ("accountId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "acnttype_idx" ON "accounts" ("accountType") `,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_8e3bcf3d6dec78d095b493d9573" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "FK_8e3bcf3d6dec78d095b493d9573"`,
    );
    await queryRunner.query(`DROP INDEX "public"."acnttype_idx"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
