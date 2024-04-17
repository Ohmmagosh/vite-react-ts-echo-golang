import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type TLogOutBtnProps = {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined
};

export function LogOutBtn(props: TLogOutBtnProps) {
  const { size } = props;
  const navigate = useNavigate();
  const removeUser = useUserStore((state) => state.removeUser);
  async function handleOnClick() {
    removeUser();
    navigate("/login")
  }
  return (
    <Button
      size={size}
      variant={"destructive"}
      onClick={handleOnClick}
    >
      Log Out
    </Button>
  );
}
