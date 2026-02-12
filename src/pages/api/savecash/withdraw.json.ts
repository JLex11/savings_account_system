import { debitBalance } from "../../../lib/db";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();
	const { userId, amount } = body;

	if (!userId || amount === undefined) {
		return new Response(
			JSON.stringify({
				success: false,
				message: "userId y amount son requeridos",
			}),
			{ status: 400 },
		);
	}

	const response = debitBalance(Number(userId), Number(amount));

	return new Response(JSON.stringify(response), {
		status: response.success ? 200 : 400,
	});
};
