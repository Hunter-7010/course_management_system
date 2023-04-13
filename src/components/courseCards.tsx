import { Courses } from "@prisma/client";
import Link from "next/link";
type Props = {
  course: Courses;
};

const CourseCards = ({ course }: Props) => {
  return (
    <Link href={`/dashboard/${course.id}`}>
    <article className="relative h-96 w-[320px] cursor-pointer overflow-hidden rounded-lg shadow transition hover:shadow-lg dark:shadow-gray-700/25 sm:mr-auto">
      <img
        alt={course.title}
        src={course.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
        }}
        className="h-44 w-full object-cover"
      />

      <div className="bg-white p-4 dark:bg-gray-900 sm:p-6">
        <time
          dateTime="2022-10-10"
          className="block text-xs text-gray-500 dark:text-gray-400"
        >
          {course.createdAt.toDateString()}
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
            {course.title}
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {course.header}
        </p>
      </div>
      <div className="absolute bottom-0 flex h-12 w-full items-start justify-between px-4">
        <p className="text-sm">
          {" "}
          <span className="text-gray-700">By </span>{" "}
          <span className="font-bold">{course.authorName} ss</span>{" "}
        </p>
        <p className="font-bold">${course.price}</p>
      </div>
    </article>
    </Link>
  );
};

export default CourseCards;
