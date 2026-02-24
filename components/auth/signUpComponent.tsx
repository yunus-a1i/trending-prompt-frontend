"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { loginUser, registerUser } from "@/lib/features/auth/authThunks";
import {
  selectAuthLoading,
  selectAuth,
} from "@/lib/features/auth/authSelectors";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignUpComponent() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const { error } = useAppSelector(selectAuth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(registerUser(data));
    router.replace('/login');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen text-black"
      >
        <div className=" w-full px-3 lg:px-10 py-20 lg:py-43.5 space-y-2 bg-white shadow-md">
          <div>
            <h2 className="font-medium text-5xl lg:text-6xl font-serif italic leading-[100%] tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-sm font-extralight text-black mb-2">
              Discover trending AI prompts crafted to boost creativity,
              productivity, and results. Explore ready-to-use prompts for
              ChatGPT, Midjourney, coding, marketing, design, and more—all in
              one place.
            </p>
          </div>

          <div className="bg-[#D9D9D9] h-10 flex items-center justify-center rounded-full  text-black text-center">
            <div className="flex justify-center items-center gap-2">
               <FcGoogle size={20} /> Continue
              with Google
            </div>
          </div>

          <div className="flex justify-around relative px-2">
            <div className="my-4 border-y  border-dashed border-black w-full  "></div>
            <div className="absolute top-0 p-1 bottom-0 bg-white rounded-full ">
              OR
            </div>
          </div>

          <div className="mb-4 ">
            <label className="block text-black mb-1 text-sm font-medium">
              Name
            </label>
            <input
              type="name"
              {...register("name")}
              className="bg-[#D9D9D9] px-4  h-10 w-full flex items-center justify-center rounded-full text-black  focus:outline-none focus:ring focus:ring-gray-400"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4 ">
            <label className="block text-black mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="bg-[#D9D9D9] px-4  h-10 w-full flex items-center justify-center rounded-full text-black  focus:outline-none focus:ring focus:ring-gray-400"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-black mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="bg-[#D9D9D9] px-4  h-10 w-full flex items-center justify-center rounded-full text-black  focus:outline-none focus:ring focus:ring-gray-400"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white  h-10 w-full flex items-center justify-center rounded-full text-center focus:outline-none focus:ring focus:ring-gray-400"
          >
            {loading ? "Sign up..." : "Register"}
          </button>
          <div className="flex justify-between text-xs lg:text-sm py-4">
            <Link href={'/login'}>Already have an Account ? Login</Link>
            <Link href={'/forgot-password'}>forgot password?</Link>
          </div>
        </div>

        <div className="hidden lg:block bg-[#111111] text-white w-full px-8.5">
          <div className="h-[80%]"></div>
          <div>
            <h1 className="font-normal text-6xl font-serif italic">
              Trending Prompt
            </h1>
            <p>
              Discover trending AI prompts crafted to boost creativity,
              productivity, and results. Explore ready-to-use prompts for
              ChatGPT, Midjourney, coding, marketing, design, and more—all in
              one place.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
