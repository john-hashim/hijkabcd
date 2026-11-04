import { LoaderCircle } from "lucide-react";

export default function Loader() {
	return (
		<div className="grid min-h-64 w-full place-items-center" role="status">
			<LoaderCircle
				className="size-5 animate-spin text-slate-600 motion-reduce:animate-none"
				aria-hidden="true"
			/>
			<span className="sr-only">Loading…</span>
		</div>
	);
}
