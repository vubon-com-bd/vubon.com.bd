import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { RegisterForm } from '../../components/auth/register-form';

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Account | Vubon Customer Dashboard</title>
        <meta name="description" content="Create your customer account" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-primary-600">
                  Vubon
                </a>
                <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                  Customer
                </span>
              </div>
              <nav className="flex items-center space-x-4">
                <a href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Sign in
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <RegisterForm redirectTo="/dashboard" />
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Vubon. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RegisterPage;
