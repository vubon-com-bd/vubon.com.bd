import type { NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Customer Dashboard | Vubon</title>
        <meta name="description" content="Customer dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your dashboard.</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
