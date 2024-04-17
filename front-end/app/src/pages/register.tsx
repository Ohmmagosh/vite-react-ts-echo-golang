import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { postRegister } from "@/actions/post-register";
import { toast } from "sonner";

const FormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  role: z.string().optional(),
});

export type TRegisterFormData = z.infer<typeof FormSchema>;

export default function Register() {
  const navigate = useNavigate();
  const form: UseFormReturn<TRegisterFormData> = useForm<TRegisterFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "client",
    },
  });

  async function onSubmit(data: TRegisterFormData) {
    // toast.info(JSON.stringify(data, null, 3))
    try{
      const response = await postRegister(data);
      if (response.ok) {
        toast.success('User created successfully');
        navigate('/login');
      } else {
        form.reset();
        return
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center bg-primary">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
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
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" variant={"default"}>Register</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
