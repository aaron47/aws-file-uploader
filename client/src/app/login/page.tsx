'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import login from './login';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export default function Login() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    const error = await login(formData);
    if (error) {
      toast({
        title: 'Error Logging in',
        description: error.error,
        color: 'red',
        duration: 3000,
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
          className="space-y-4 my-12 border-muted border-2 p-8 rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center gap-6">
            <Button type="submit">Login</Button>
            <Link href="register" passHref>
              <Button variant={'secondary'} type="button">
                Register
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
