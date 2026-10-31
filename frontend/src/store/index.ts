import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { createAppSlice } from "./slices";
import type { StoreState } from "./types";

export const useStore = create<StoreState>()(
	devtools(
		(...args) => ({
			...createAppSlice(...args),
		}),
		{ name: "AppStore", enabled: import.meta.env.DEV },
	),
);

export const useAppStore = () =>
	useStore(
		useShallow((state) => ({
			count: state.count,
			increment: state.increment,
			reset: state.reset,
		})),
	);
