import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import CourseCards from "~/components/courseCards";
import DarkMode from "~/components/darkMode";
import LoadingAllCourses from "~/components/loadingAllCourses";
import SideBar from "~/components/sideBar";
const Home: NextPage = () => {
  const {status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    void router.push("/dashboard/signin");
  }
  const { data: coursesData, isLoading } =
    api.dashboard.getAllCourses.useQuery();
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dashboard for course management app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  min-h-screen w-screen overflow-hidden bg-gradient-to-b duration-500 dark:bg-gray-900 dark:text-white">
        <div className="hidden shrink-0 grow-0 flex-col overflow-y-auto border-r dark:border-gray-700 lg:flex">
          <div className="flex min-h-[96px] items-center  justify-center border-b px-8 text-2xl font-bold dark:border-gray-700">
            Course Managment
          </div>
          <div className="flex h-[41.2rem] w-full flex-col  text-gray-400 antialiased">
            <h2 className="flex w-full flex-col justify-center py-5 pl-[50px] pr-5 text-sm font-semibold tracking-widest">
              <DarkMode />
            </h2>

            <div className="relative gap-y-12 overflow-y-auto pr-6">
              <Link href="/dashboard">
                <h3
                  className={`mb-3 flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                    router.asPath == "/dashboard"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-300"
                  }`}
                >
                  <p className="max-w-[190px] overflow-hidden truncate">Home</p>
                </h3>
              </Link>
              <Link href="/dashboard/register">
                <h3
                  className={`mb-3 flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                    router.asPath == "/dashboard/register"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-300"
                  }`}
                >
                  <p className="max-w-[190px] overflow-hidden truncate">
                    Register User
                  </p>
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="fixed left-9 top-[28px] overflow-y-auto lg:hidden">
          <SideBar>
            <div className="mb-4 flex w-full justify-center">
              <DarkMode />
            </div>

            <div className="relative space-y-1 overflow-y-auto  pr-6">
              <Link href="/dashboard">
                <h3
                  className={`mb-3 flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                    router.asPath == "/dashboard"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-300"
                  }`}
                >
                  <p className="max-w-[190px] overflow-hidden truncate">Home</p>
                </h3>
              </Link>
              <Link href="/dashboard/register">
                <h3
                  className={`mb-3 flex cursor-pointer items-center space-x-5 truncate rounded-r-full py-4 pl-8 font-semibold  hover:text-white ${
                    router.asPath == "/dashboard/register"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-300"
                  }`}
                >
                  <p className="max-w-[190px] overflow-hidden truncate">
                    Register User
                  </p>
                </h3>
              </Link>
            </div>
          </SideBar>
        </div>

        <div className="flex grow flex-col overflow-y-auto">
          <div className="flex min-h-[96px] items-center justify-between border-b dark:border-gray-700">
            <h1 className="w-1/2 truncate pl-14 text-2xl font-bold text-gray-900  antialiased dark:text-white md:pl-10">

            </h1>
            <div className="flex space-x-4 pr-10">
              <div
                className="group relative cursor-pointer inline-block justify-center overflow-hidden rounded-full border border-blue-600 px-5 py-2 focus:outline-none focus:ring"
                onClick={() => void signOut()}
              >
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-600 transition-all group-hover:h-full group-active:bg-blue-500"></span>

                <span className="relative w-full text-sm font-medium text-blue-600 transition-colors group-hover:text-white">
                  Sign Out
                </span>
              </div>
              <Link href="/dashboard/new">
                <button className="hidden items-center justify-center rounded-l-full rounded-r-full bg-blue-500 px-6 py-2.5 text-white duration-300 hover:opacity-70 md:flex">
                  + Add New Course
                </button>
                <button className="block items-center justify-center rounded-full bg-blue-500 px-6 py-2.5 text-white duration-300 hover:opacity-70 md:hidden">
                  +
                </button>
              </Link>
              
            </div>
          </div>
          {isLoading ? (
            <LoadingAllCourses />
          ) : (
            <div className="flex h-full w-full flex-wrap justify-center gap-x-12 gap-y-4 overflow-y-auto px-4 py-4 md:justify-start">
              {coursesData?.map((course) => (
                <CourseCards key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
