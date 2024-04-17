import { HomeLayout } from "@/layout/home-layout"
import { useUserStore } from "@/store/user-store"
import { useNavigate } from "react-router-dom"
import { Client } from "@/pages/client"
import { Admin } from "@/pages/admin"

export default function Home() {
	const navigate = useNavigate()
	const [user] = useUserStore((state) => [state.user])
	if (!user) {
		navigate("/login")
	}
	return (
		<HomeLayout>
			{user?.role === "admin" ? <Admin /> : <Client />}
		</HomeLayout>
	)
}
