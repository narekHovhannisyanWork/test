import { Knex } from 'knex';

export interface WildberriesTariff {
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
  warehouseName: string;
  created_at: string;
  updated_at: string;
}

export const createWildberriesTariffsTable = async (knex: Knex) => {
  await knex.schema.createTable('wildberries_tariffs', (table) => {
    table.increments('id').primary();
    table.string('boxDeliveryAndStorageExpr').notNullable();
    table.string('boxDeliveryBase').notNullable();
    table.string('boxDeliveryLiter').notNullable();
    table.string('boxStorageBase').notNullable();
    table.string('boxStorageLiter').notNullable();
    table.string('warehouseName').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
};

export const insertWildberriesTariff = async (knex: Knex, tariffData: WildberriesTariff) => {
  return knex('wildberries_tariffs').insert(tariffData);
};

export const updateWildberriesTariff = async (knex: Knex, id: number, tariffData: WildberriesTariff) => {
  return knex('wildberries_tariffs').where({ id }).update(tariffData);
};
