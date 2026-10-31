import type { StateCreator } from "zustand";
import type { StoreState } from "../types";

export interface AppSlice {
	count: number;
	increment: () => void;
	reset: () => void;
}

export const createAppSlice: StateCreator<
	StoreState,
	[["zustand/devtools", never]],
	[],
	AppSlice
> = (set) => ({
	count: 0,
	increment: () =>
		set((state) => ({ count: state.count + 1 }), false, "app/increment"),
	reset: () => set({ count: 0 }, false, "app/reset"),
});
