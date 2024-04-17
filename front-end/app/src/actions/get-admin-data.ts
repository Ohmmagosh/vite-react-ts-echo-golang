export async function getAdminData(name:string, role: string): Promise<Response> {
	const endPoint = import.meta.env.VITE_API_URL + "/admin/data"
	const response = await fetch(endPoint, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"name": name,
			"role": role,
		},
	})
	return response
}
