import { useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { WindActual } from "@/api/services/app";
import { formatDate } from "@/lib/formatDate";

const HALF_HOUR = 30 * 60 * 1000;
const ACTUAL_COLOR = "#2563eb";
const formatTime = (time: number) =>
	new Date(time).toLocaleTimeString("en-GB", {
		timeZone: "Europe/London",
		hour: "2-digit",
		minute: "2-digit",
	});

const formatTooltipTime = (time: number) =>
	new Date(time).toLocaleTimeString("en-US", {
		timeZone: "Europe/London",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

function WindTooltip({
	active,
	payload,
}: {
	active?: boolean;
	payload?: ReadonlyArray<{ payload?: unknown }>;
}) {
	if (!active || !payload?.length) return null;
	const point = payload[0].payload as
		| { date: string; time: number; energy: number | null }
		| undefined;
	if (!point) return null;
	const { date, time, energy } = point;

	return (
		<div className="space-y-1 rounded-lg border bg-background px-3 py-2 text-sm">
			<p className="font-medium">{formatDate(date)}</p>
			<p className="text-muted-foreground">
				{formatTooltipTime(time)} – {formatTooltipTime(time + HALF_HOUR)} (UK)
			</p>
			<p className="flex items-center gap-2 pt-1 text-muted-foreground">
				<span
					className="size-2 rounded-full"
					style={{ backgroundColor: ACTUAL_COLOR }}
					aria-hidden="true"
				/>
				Actual generated electricity
			</p>
			<p className="font-semibold">
				{energy === null
					? "No reading available"
					: `${energy.toLocaleString("en-GB", { maximumFractionDigits: 1 })} MWh`}
			</p>
		</div>
	);
}

export default function WindGenerationChart({
	readings,
	date,
}: {
	readings: WindActual[];
	date: string;
}) {
	const [showActuals, setShowActuals] = useState(true);
	const readingsByTime = new Map(
		readings.map((reading) => [
			Date.parse(reading.startTime),
			reading.generation,
		]),
	);
	const start = Date.parse(`${date}T00:00:00Z`);
	const data = Array.from({ length: 48 }, (_, index) => {
		const time = start + index * HALF_HOUR;
		const generation = readingsByTime.get(time);
		return { date, time, energy: generation == null ? null : generation * 0.5 };
	});

	return (
		<div className="space-y-3 rounded-xl border bg-white p-4">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h2 className="text-sm font-semibold text-slate-700">
						Wind electricity generated on {formatDate(date)}
					</h2>
					<p className="text-sm text-muted-foreground">
						Electricity generated in each half-hour, in MWh. All times are UK
						time.
					</p>
				</div>
				<div className="ml-auto flex flex-wrap justify-end gap-2">
					<button
						type="button"
						aria-pressed={showActuals}
						onClick={() => setShowActuals((visible) => !visible)}
						className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-opacity hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${showActuals ? "" : "opacity-50"}`}
					>
						<span
							className="h-0.5 w-5 rounded-full"
							style={{ backgroundColor: ACTUAL_COLOR }}
							aria-hidden="true"
						/>
						<span className={showActuals ? "" : "line-through"}>
							Actual generated electricity
						</span>
					</button>
					<button
						type="button"
						disabled
						title="Forecast data is not available yet"
						className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground opacity-50"
					>
						<span
							className="w-5 border-t-2 border-dashed border-amber-500"
							aria-hidden="true"
						/>
						Forecast wind electricity
					</button>
				</div>
			</div>
			<div className="h-72 w-full text-xs">
				<ResponsiveContainer width="100%" height="100%" minWidth={0}>
					<LineChart
						data={data}
						margin={{ top: 8, right: 12, bottom: 20, left: 8 }}
						accessibilityLayer
					>
						<CartesianGrid vertical={false} stroke="var(--border)" />
						<XAxis
							dataKey="time"
							tickFormatter={formatTime}
							interval={7}
							tickLine={false}
							axisLine={false}
							tickMargin={10}
							label={{ value: "Time (UK)", position: "bottom", offset: 6 }}
						/>
						<YAxis
							includeHidden
							tickLine={false}
							axisLine={false}
							width={68}
							tickFormatter={(value: number) => value.toLocaleString("en-GB")}
							label={{ value: "MWh", angle: -90, position: "insideLeft" }}
						/>
						{showActuals && (
							<Tooltip content={WindTooltip} filterNull={false} />
						)}
						<Line
							type="linear"
							dataKey="energy"
							name="Actual generated electricity"
							stroke={ACTUAL_COLOR}
							hide={!showActuals}
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 4 }}
							connectNulls={false}
							isAnimationActive={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
