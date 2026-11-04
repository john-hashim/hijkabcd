import { Clock3 } from "lucide-react";

export default function Header() {
	return (
		<header className="-mx-6 border-b border-slate-200 bg-white sm:-mx-8 lg:-mx-12">
			<div className="flex flex-wrap items-center justify-between gap-4 px-6 py-2.5 sm:px-8 lg:px-12">
				<p className="text-2xl font-bold text-slate-900">
					UK Wind Generation
				</p>
				<div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
					<Clock3 className="size-3.5 shrink-0" aria-hidden="true" />
					<span>Time zone: UK (London)</span>
				</div>
			</div>
		</header>
	);
}
