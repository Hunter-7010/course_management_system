import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import DeleteConfirmation from "~/components/deleteConfirmation";
// import OneCampLoading from "~/components/oneCampLoading";

import Description from "~/components/description";
import ThingToLearn from "~/components/thingToLearn";
import UpArrow from "~/components/svgs/upArrow.svg";
import { CourseType } from "~/types/dashboard.type";
const Show: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const param = router.query.id as string;
  const { data: courseData, isLoading } = api.dashboard.getCourseById.useQuery(
    {
      id: param ? param : "",
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const ctx = api.useContext();
  const { mutateAsync: deleteCourse } = api.dashboard.deleteCourse.useMutation({
    onSuccess: () => {
      void router.push("/dashboard");
      return ctx.invalidate();
    },
  });

  const deleteHandler = () => {
    void toast.promise(
      deleteCourse({ id: param }),
      {
        loading: "...Deleting Course...",
        success: "Course Deleted successfully!",
        error: "Something went wrong!",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 1000,
        },
      }
    );
  };

  //   if (isLoading) {
  //    return <OneCampLoading />;
  //   }
  return (
    <section>
      <Link href="/dashboard">
        <div className="mx-24 flex w-20 cursor-pointer space-x-1 pt-4 font-medium text-blue-600 hover:text-blue-800">
          <UpArrow className="-rotate-90 hover:scale-100" />
          <span>Back</span>
        </div>
      </Link>

      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="grid grid-cols-1 gap-4">
            <img
              alt="courseData picture"
              src={courseData?.image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
              }}
              className="aspect-square w-full rounded-xl object-cover"
            />
          </div>

          <div className="sticky top-0">
            <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              {courseData?.authorName}
            </strong>

            <div className="mt-8 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {courseData?.title}
                </h1>

                <p className="text-sm">{courseData?.language}</p>
                <p className="text-xs opacity-50">
                  {courseData?.createdAt.toDateString()}
                </p>
              </div>

              <p className="text-lg font-bold">${courseData?.price}</p>
            </div>

            <div className="mt-4">
              <div className="prose max-w-none">
                <p>{courseData?.header}</p>
              </div>
            </div>
            {sessionData?.user.image == courseData?.author && (
              <div className="mt-8 flex gap-4">
                <DeleteConfirmation deleteHandler={deleteHandler} />
                <Link href={`/dashboard/${param}/edit`}>
                  <button
                    type="button"
                    className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit Course
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Description
          description={courseData?.description as CourseType["description"]}
        />
        <ThingToLearn
          thingsToLearn={courseData?.thingToLearn as CourseType["thingToLearn"]}
        />
      </div>
    </section>
  );
};

export default Show;
