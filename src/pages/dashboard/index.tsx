import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import CourseCards from "~/components/courseCards";
import DarkMode from "~/components/darkMode";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();
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
            <h2 className="py-5 flex w-full justify-center pr-5 text-sm font-semibold tracking-widest">
              <DarkMode/>
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
        <div className="fixed top-3.5 overflow-y-auto lg:hidden">
          {/* <SideBar boardCount={boardData?.boardsCount}>
            <div className="flex w-full flex-col justify-center">
            
            </div>

            <div className="relative space-y-1 overflow-y-auto  pr-6">
              <NewBoard />
              {boardData ? (
                boardData.boards?.map((board) => (
                  <div
                    key={board.id}
                    onClick={() => handleBoardClick(board.id)}
                  >
                    <Boards
                      title={board.title}
                      currentBoardId={boardId}
                      boardId={board.id}
                      key={board.id}
                    />
                  </div>
                ))
              ) : (
                <BoardsLoading />
              )}
            </div>
          </SideBar> */}
        </div>

        <div className="flex grow flex-col overflow-y-auto">
          <div className="flex min-h-[96px] items-center justify-between border-b dark:border-gray-700">
            <h1 className="w-1/2 truncate pl-14 text-2xl font-bold text-gray-900  antialiased dark:text-white md:pl-10">
              {/* {oneBoardData.title} */}
            </h1>
            <div className="flex space-x-4 pr-10">
              <Link href="/dashboard/new">
                <button className="hidden items-center justify-center rounded-l-full rounded-r-full bg-blue-500 px-6 py-2.5 text-white duration-300 hover:opacity-70 md:flex">
                  + Add New Course
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white duration-300 hover:opacity-70 md:hidden">
                  +
                </button>
              </Link>
              <div className="flex items-center justify-center">
                {/* <BoardOptionsDropdown boardId={boardId} /> */}
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-wrap justify-center gap-x-12 gap-y-4 overflow-y-auto px-4 py-4 md:justify-start">
            {coursesData?.map((course) => (
              <CourseCards key={course.id} course={course} />
            ))}
          </div>
        </div>
        {/*  ) : isLoadingOneBoard ? (
           <LoadingOneBoard />
         ) : (
           <NoBoardSelected />
         )} */}
      </main>
    </>
  );
};

export default Home;
