import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { postLogin } from "@/actions/post-login";
import { useUserStore } from "@/store/user-store";

const FormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type TLogInFormData = z.infer<typeof FormSchema>;

export default function Login() {
  const [setUser] = useUserStore  ((state) => [state.setUser]);

  const navigate = useNavigate();
  const form: UseFormReturn<TLogInFormData> = useForm<TLogInFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function handleOnClick() {
    navigate("/register");
  }
  async function onSubmit(data: TLogInFormData) {
    const response = await postLogin(data);
    if (response.status === 200) {
      const json = await response.json();
      setUser({name: json.username, role: json.role});
      toast.success("User Login successfully");
      navigate("/");
    } else if (response.status === 404){
      toast.error("User not found, please register");
      form.reset();
    } else {
      toast.error("Server error, please try again later");
      form.reset();
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-primary">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleOnClick}>
                SignUp
              </Button>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
