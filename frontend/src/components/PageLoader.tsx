import Loader from "./Loader";

export default function PageLoader() {
	return (
		<div className="fixed inset-0 z-50 grid place-items-center bg-white/90">
			<Loader />
		</div>
	);
}
