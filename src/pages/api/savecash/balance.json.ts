import { getBalance } from "../../../lib/db";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }) => {
	const userId = url.searchParams.get("userId");

	if (!userId) {
		return new Response(
			JSON.stringify({ success: false, message: "userId es requerido" }),
			{ status: 400 },
		);
	}

	const response = getBalance(Number(userId));

	return new Response(JSON.stringify(response), {
		status: response.success ? 200 : 404,
	});
};
