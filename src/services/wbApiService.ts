import axios from "axios";

const WB_API_URL = "https://common-api.wildberries.ru/api/v1/tariffs/box";

export const fetchWBTariffs = async (date: string) => {
  try {

    const response = await axios.get(WB_API_URL, {
      params: { date },
      headers: {
        Authorization: `Bearer ${process.env.WB_BEARER_TOKEN}`
      }
    });

    return response.data.response.data;
  } catch (error) {
    console.error("Ошибка получения данных с WB API", error);
    throw error;
  }
};
