import { useState } from "react";
import { useAppStore } from "../../../store";

const formatTime = (value: string) =>
	new Date(value).toLocaleString("en-GB", {
		timeZone: "Europe/London",
		dateStyle: "short",
		timeStyle: "short",
	});

export default function WindDashboard() {
	const [date, setDate] = useState("");
	const {
		windActuals,
		windActualsDate,
		isLoadingWindActuals,
		windActualsError,
		fetchWindActuals,
	} = useAppStore();

	return (
		<section aria-labelledby="wind-heading">
			<div>
				<h1 id="wind-heading">Actual wind generation</h1>
				<p>Select a delivery date to see Elexon-reported wind generation.</p>
			</div>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					if (date) void fetchWindActuals(date);
				}}
			>
				<div>
					<label htmlFor="delivery-date">Delivery date</label>
					<input
						id="delivery-date"
						type="date"
						required
						value={date}
						onChange={(event) => setDate(event.target.value)}
					/>
				</div>
				<button type="submit" disabled={!date || isLoadingWindActuals}>
					{isLoadingWindActuals ? "Loading…" : "Load actuals"}
				</button>
			</form>

			<div aria-live="polite" aria-busy={isLoadingWindActuals}>
				{isLoadingWindActuals ? (
					<p>Fetching wind generation…</p>
				) : windActualsError ? (
					<p role="alert">{windActualsError} Select Load actuals to retry.</p>
				) : !windActualsDate ? (
					<p>Choose a date and select Load actuals.</p>
				) : windActuals.length === 0 ? (
					<p>No wind generation readings found for {windActualsDate}.</p>
				) : (
					<div>
						<table>
							<caption>
								{windActuals.length} readings for {windActualsDate}. Times shown
								in Europe/London.
							</caption>
							<thead>
								<tr>
									{[
										"Settlement date",
										"Period",
										"Start time",
										"Generation (MW)",
										"Fuel",
										"Dataset",
										"Published",
									].map((heading) => (
										<th key={heading} scope="col">
											{heading}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{windActuals.map((reading) => (
									<tr key={reading.startTime}>
										<td>{reading.settlementDate}</td>
										<td>{reading.settlementPeriod}</td>
										<td>{formatTime(reading.startTime)}</td>
										<td>
											{reading.generation?.toLocaleString("en-GB") ?? "Missing"}
										</td>
										<td>{reading.fuelType}</td>
										<td>{reading.dataset}</td>
										<td>{formatTime(reading.publishTime)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</section>
	);
}
