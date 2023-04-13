const LoadingAllCourses = () => {
  return (
    <div className="flex h-full w-full flex-wrap justify-center gap-x-12 gap-y-4 overflow-y-auto px-4 py-4 md:justify-start">
      {[...Array(6).keys()].map((i: number) => (
        <article
          key={i}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1s",
          }}
          className="relative h-96 w-[320px] animate-pulse cursor-pointer overflow-hidden rounded-lg shadow transition hover:shadow-lg dark:shadow-gray-700/25 sm:mr-auto"
        >
          <div className="h-44 w-full bg-gray-200 dark:bg-gray-600 "></div>

          <div className="p-4 dark:bg-gray-900 sm:p-6">
            <time
              dateTime="2022-10-10"
              className="h-4 w-12 rounded-full bg-gray-400 dark:bg-gray-800"
            ></time>

            <a href="#">
              <h3 className="mt-0.5 h-2 w-24 rounded-full text-lg font-bold text-gray-900 dark:text-white"></h3>
            </a>

            <p className="mt-6 h-3 w-44 rounded-full bg-gray-400 dark:bg-gray-800"></p>
            <p className="mt-2 h-3 w-44 rounded-full bg-gray-400 dark:bg-gray-800"></p>
            <p className="mt-2 h-3 w-12 rounded-full bg-gray-400 dark:bg-gray-800"></p>
          </div>
          <div className="absolute bottom-0 flex h-12 w-full items-start justify-between px-4">
            <p className="h-6 w-24 rounded-full bg-gray-400 dark:bg-gray-800"></p>
            <p className="h-6 w-20 rounded-full bg-gray-400 dark:bg-gray-800"></p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default LoadingAllCourses;
