import { isAxiosError } from "axios";
import type { StateCreator } from "zustand";
import { appService, type WindActual } from "../../api/services/app";
import type { StoreState } from "../types";

export interface AppSlice {
	count: number;
	increment: () => void;
	reset: () => void;
	windActuals: WindActual[];
	windActualsDate: string | null;
	isLoadingWindActuals: boolean;
	windActualsError: string | null;
	fetchWindActuals: (date: string) => Promise<void>;
}

export const createAppSlice: StateCreator<
	StoreState,
	[["zustand/devtools", never]],
	[],
	AppSlice
> = (set) => {
	let latestRequest = 0;

	return {
		count: 0,
		increment: () =>
			set((state) => ({ count: state.count + 1 }), false, "app/increment"),
		reset: () => set({ count: 0 }, false, "app/reset"),
		windActuals: [],
		windActualsDate: null,
		isLoadingWindActuals: false,
		windActualsError: null,
		fetchWindActuals: async (date) => {
			const request = ++latestRequest;
			set(
				{
					windActuals: [],
					windActualsDate: date,
					isLoadingWindActuals: true,
					windActualsError: null,
				},
				false,
				"app/fetchActuals/pending",
			);

			try {
				const windActuals = await appService.getWindActuals(date);
				if (request !== latestRequest) return;

				set(
					{ windActuals, isLoadingWindActuals: false },
					false,
					"app/fetchActuals/success",
				);
			} catch (error: unknown) {
				if (request !== latestRequest) return;

				const detail: unknown = isAxiosError(error)
					? error.response?.data?.detail
					: undefined;
				set(
					{
						isLoadingWindActuals: false,
						windActualsError:
							typeof detail === "string"
								? detail
								: "Unable to fetch wind generation. Please try again.",
					},
					false,
					"app/fetchActuals/error",
				);
			}
		},
	};
};
