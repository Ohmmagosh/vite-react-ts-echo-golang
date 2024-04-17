export async function getClientData(name: string, role:string):Promise<Response> {
	const endPoint = import.meta.env.VITE_API_URL + "/client/data"
	const respone = await fetch(endPoint, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"name": name,
			"role": role,
		},
	})
	return respone
}
