import { Restaurant } from "../models/Restaurant";
import { get} from "./serviceBase";

const BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

export const getRestaurang = async (id: string) => {
    const data = await get<Restaurant>(`${BASE_URL}/restaurant/${id}`);
    return data;
};