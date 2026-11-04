import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/formatDate";

interface DatePickerProps {
	id: string;
	date: Date | undefined;
	onChange: (date: Date) => void;
	minDate: Date;
	maxDate: Date;
	describedBy?: string;
}

export default function DatePicker({
	id,
	date,
	onChange,
	minDate,
	maxDate,
	describedBy,
}: DatePickerProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					type="button"
					variant="outline"
					aria-describedby={describedBy}
					className="h-10 w-full justify-between font-normal sm:w-72"
				>
					<CalendarDays className="size-4 text-muted-foreground" />
					<span className="flex-1 text-left">
						{date ? formatDate(date) : "Select a date"}
					</span>
					<ChevronDown className="size-4 text-muted-foreground" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-auto p-0">
				<Calendar
					mode="single"
					required
					selected={date}
					defaultMonth={date ?? minDate}
					startMonth={minDate}
					endMonth={maxDate}
					disabled={{ before: minDate, after: maxDate }}
					showOutsideDays={false}
					weekStartsOn={1}
					onSelect={(selected) => {
						onChange(selected);
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
