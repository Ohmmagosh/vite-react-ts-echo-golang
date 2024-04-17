import { TRegisterFormData } from "@/pages/register";

export async function postRegister(payload: TRegisterFormData):Promise<Response> {
  const endPoint = import.meta.env.VITE_API_URL + "/register";
  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
}
