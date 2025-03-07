'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthFormData } from '@/core/types';
import { userSchema } from '@/schema';
import { useRegisterUserMutation } from '@/services/register';
import toast from 'react-hot-toast';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: AuthFormData) => {
    try {
      const response = await registerUser(data).unwrap();
      toast.success(response.message);
      router.push('/');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error('Registration failed');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800'>
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='relative'>
            <Mail className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
            <input
              type='email'
              placeholder='Enter your email'
              {...register('email')}
              autoComplete='email'
              className={`w-full rounded-lg border border-gray-300 p-3 pl-10 transition outline-none focus:border-blue-500 ${
                errors.email ? 'border-red-500 focus:border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className='relative'>
            <Lock className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Create a password'
              {...register('password')}
              autoComplete='current-password'
              className={`w-full rounded-lg border border-gray-300 p-3 pr-10 pl-10 transition outline-none focus:border-blue-500 ${
                errors.password ? 'border-red-500 focus:border-red-500' : ''
              }`}
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

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-lg bg-green-600 p-3 text-white transition hover:bg-green-700'
          >
            Register
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-600'>
          Already have an account?
          <Link href='/login' className='ml-1 text-green-600 hover:underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
