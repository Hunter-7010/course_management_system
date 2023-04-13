import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn,useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Course management system to manage the courses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="relative font-serif bg-[url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to
              <strong className="block font-extrabold text-blue-700">
                Course Management
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/dashboard"
              >
                <h3 className="text-xl font-bold">Dashboard</h3>
              </Link>
              {sessionData?.user ? (
                <Link
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                  href="/dashboard/register"
                >
                  <h3 className="text-2xl font-bold">Register</h3>
                </Link>
              ) : (
                <button
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                  onClick={() => void signIn()}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
