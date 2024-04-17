import { HomeLayout } from "@/layout/home-layout"
import { useUserStore } from "@/store/user-store"
import { useNavigate } from "react-router-dom"
import { Client } from "@/pages/client"
import { Admin } from "@/pages/admin"
import { useEffect } from "react"

export default function Home() {
  const navigate = useNavigate()
  const [user] = useUserStore((state) => [state.user])

  useEffect(() => {
    const validateUser = () => {
      if (!user) {
        navigate("/login")
      }
    }
    validateUser()
  }, [])
  return (
    <HomeLayout>
      {user?.role === "admin" ? <Admin /> : <Client />}
    </HomeLayout>
  )
}
