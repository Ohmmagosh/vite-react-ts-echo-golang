import { TLogInFormData } from "@/pages/login"

export async function postLogin(payload: TLogInFormData):Promise<Response> {
	const endPoint = import.meta.env.VITE_API_URL + "/login"
	const response = await fetch(endPoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	return response;
}
