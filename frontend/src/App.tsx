import { lazy, Suspense } from "react";
import Header from "./components/Header";
import PageLoader from "./components/PageLoader";

const WindDashboard = lazy(
	() => import("./features/wind/components/WindDashboard"),
);

function App() {
	return (
		<div className="min-h-dvh px-6 font-sans text-slate-900 sm:px-8 lg:px-12">
			<Suspense fallback={<PageLoader />}>
				<Header />
				<main>
					<WindDashboard />
				</main>
			</Suspense>
		</div>
	);
}

export default App;
