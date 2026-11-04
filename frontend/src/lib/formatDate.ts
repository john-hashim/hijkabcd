import { format, parseISO } from "date-fns";

export const formatDate = (date: Date | string) =>
	format(typeof date === "string" ? parseISO(date) : date, "do MMMM yyyy");
