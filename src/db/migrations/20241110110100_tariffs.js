
// @ts-ignore
export async function up(knex) {
    // Create the table based on the model definition
    // @ts-ignore
    await knex.schema.createTable('wildberries_tariffs', (table) => {
        table.increments('id').primary(); // Auto-incrementing ID for each record
        table.string('boxDeliveryAndStorageExpr').notNullable();
        table.string('boxDeliveryBase').notNullable();
        table.string('boxDeliveryLiter').notNullable();
        table.string('boxStorageBase').notNullable();
        table.string('boxStorageLiter').notNullable();
        table.string('warehouseName').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
}
// @ts-ignore
export async function down(knex) {
    // Drop the table if migration is rolled back
    await knex.schema.dropTableIfExists('wildberries_tariffs');
}
