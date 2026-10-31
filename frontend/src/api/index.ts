import axios from "axios";

// Shared client for future services. Creating it does not send any requests.
const apiClient = axios.create({
	timeout: 10000,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

export default apiClient;
