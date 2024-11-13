import cron from "node-cron";
import db from "#config/dbConfig.ts";
import { fetchWBTariffs } from "#services/wbApiService.ts";
import { createAndInsertGoogleSheet } from "#services/googleSheetsService.ts";

export const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const scheduleTasks = async () => {

  cron.schedule("0 * * * *", async () => {
    const currentDate = getCurrentDate();

    const data = await fetchWBTariffs(currentDate);

    for (const tariff of data.warehouseList) {
      await db('wildberries_tariffs').insert({
        ...tariff,
      });
      console.log('Данные успешно обновлены');
    }

    const tariffsFromDB = await db('wildberries_tariffs')
      .whereRaw('DATE(created_at) = ?', [currentDate]);

    await createAndInsertGoogleSheet(tariffsFromDB);
    console.log('Данные успешно обновлены');
  });
};
