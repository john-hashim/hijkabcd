import { addDays, formatISO } from "date-fns";
import { useMemo, useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/formatDate";
import Loader from "../../../components/Loader";
import { useAppStore } from "../../../store";
import WindGenerationChart from "./WindGenerationChart";

const MIN_DECISION_DATE = new Date(2026, 0, 1);
const MAX_DECISION_DATE = new Date(2026, 0, 31);

export default function WindDashboard() {
	const [date, setDate] = useState<Date>();
	const {
		windActuals,
		windActualsDate,
		isLoadingWindActuals,
		windActualsError,
		fetchWindActuals,
  } = useAppStore();

	const handleShowWindGeneration = () => {
		if (!date) return;
		const deliveryDate = formatISO(addDays(date, 1), {
			representation: "date",
		});
		fetchWindActuals(deliveryDate);
	};

	const { availableReadings, totalWindEnergy } = useMemo(() => {
		const availableReadings = windActuals.filter(
			(reading) => reading.generation !== null,
		);
		const totalWindEnergy = availableReadings.reduce(
			(total, reading) => total + (reading.generation ?? 0) * 0.5,
			0,
		);
		return { availableReadings, totalWindEnergy };
	}, [windActuals]);

	return (
		<div className="space-y-4 py-6">
			<div className="space-y-4">
				<div className="grid gap-2">
					<Label htmlFor="decision-date" className="text-sm font-semibold">
						When are you making the electricity purchase decision?
					</Label>
					<p className="text-sm text-muted-foreground">
						Choose a date in January 2026. We will show wind generation for the
						following day.
					</p>
					<DatePicker
						id="decision-date"
						date={date}
						onChange={setDate}
						minDate={MIN_DECISION_DATE}
						maxDate={MAX_DECISION_DATE}
					/>
				</div>
				{date && (
					<p className="text-sm">
						Wind generation date: {formatDate(addDays(date, 1))}.
					</p>
				)}
				<Button
					type="button"
					disabled={!date || isLoadingWindActuals}
					onClick={handleShowWindGeneration}
				>
					Show wind generation
				</Button>
			</div>

			<div aria-busy={isLoadingWindActuals}>
				{isLoadingWindActuals ? (
					<Loader />
				) : windActualsError ? (
					<p>{windActualsError} Select Show wind generation to retry.</p>
				) : !windActualsDate ? null : windActuals.length === 0 ? (
					<p>
						No wind generation readings found for {formatDate(windActualsDate)}.
					</p>
				) : (
					<div className="space-y-4">
						<div className="max-w-md space-y-2 rounded-xl border bg-white p-4">
							<h2 className="text-sm font-semibold text-slate-700">
								Total wind electricity generated on{" "}
								{formatDate(windActualsDate)}
							</h2>
							<p className="text-3xl font-bold">
								{availableReadings.length > 0
									? totalWindEnergy.toLocaleString("en-GB", {
											maximumFractionDigits: 1,
										})
									: "Not available"}
								{availableReadings.length > 0 && (
									<span className="ml-2 text-base font-medium text-muted-foreground">
										MWh
									</span>
								)}
							</p>
							<p className="text-xs text-muted-foreground">
								MWh measures how much electricity was generated.
							</p>
						</div>
						<WindGenerationChart
							readings={windActuals}
							date={windActualsDate}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
