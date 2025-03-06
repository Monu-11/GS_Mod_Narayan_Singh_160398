'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthFormData } from '@/core/types';
import { userSchema } from '@/schema';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Login successful!');
      router.push('/dashboard');
    }
  };

  const handleRegisterClick = () => {
    router.replace('/register');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Email Input */}
          <div className='relative'>
            <Mail className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
            <input
              type='email'
              placeholder='Enter your email'
              autoComplete='email'
              {...register('email')}
              className={`w-full rounded-lg border border-gray-300 p-3 pl-10 transition outline-none focus:border-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className='relative'>
            <Lock className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              autoComplete='current-password'
              {...register('password')}
              className={`w-full rounded-lg border border-gray-300 p-3 pr-10 pl-10 transition outline-none focus:border-blue-500 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {showPassword ? (
              <EyeOff
                className='absolute top-3 right-3 h-5 w-5 cursor-pointer text-gray-500'
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className='absolute top-3 right-3 h-5 w-5 cursor-pointer text-gray-500'
                onClick={() => setShowPassword(true)}
              />
            )}
            {errors.password && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700'
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className='mt-4 text-center text-sm text-gray-600'>
          Don't have an account?
          <button
            onClick={handleRegisterClick}
            className='ml-1 text-blue-600 hover:underline'
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
