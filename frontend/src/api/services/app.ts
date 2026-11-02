import { ENDPOINTS } from "../endpoints";
import apiClient from "../index";

export interface WindActual {
	dataset: string;
	publishTime: string;
	startTime: string;
	settlementDate: string;
	settlementPeriod: number;
	fuelType: "WIND";
	generation: number | null;
}

export const appService = {
	async getWindActuals(date: string): Promise<WindActual[]> {
		const { data } = await apiClient.get<WindActual[]>(
			ENDPOINTS.APP.WIND_ACTUALS,
			{ params: { date } },
		);

		return [...data].sort(
			(left, right) => Date.parse(left.startTime) - Date.parse(right.startTime),
		);
	},
};
