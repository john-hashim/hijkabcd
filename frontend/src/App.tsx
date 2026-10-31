function App() {
	return (
		<div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
			<header className="border-b border-slate-200 bg-white">
				<div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-5">
					<span
						className="size-3 rounded-full bg-emerald-500"
						aria-hidden="true"
					/>
					<span className="text-lg font-semibold tracking-tight">
						Wind Forecast
					</span>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
				<p className="text-sm font-medium text-emerald-700">Welcome</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
					A clearer view of wind generation.
				</h1>
				<p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
					Your workspace for wind forecasts and analysis.
				</p>
			</main>
		</div>
	);
}

export default App;
