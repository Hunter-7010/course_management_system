const LoadingCourse = () => {
  return (
    <div className="">
      <section>
        <div className="relative mx-auto max-w-screen-xl animate-pulse px-4 py-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[308px] rounded-2xl bg-gray-200 dark:bg-gray-600 md:h-[508px]"></div>
            </div>

            <div className="sticky top-0 space-y-12">
              <div className="h-4 w-28 rounded-full border border-blue-600 bg-gray-100"></div>

              <div className="mt-8 flex justify-between">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="h-4 w-28 rounded-full bg-gray-400 dark:bg-gray-800 "></h1>

                  <p className="h-4 w-28 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                  <p className="h-2 w-28 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                </div>

                <p className="h-6 w-28 rounded-full bg-gray-400 dark:bg-gray-800"></p>
              </div>

              <div className="mt-4">
                <div className="prose max-w-none space-y-4">
                  <p className="h-4 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                  <p className="h-4 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                  <p className="h-4 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                  <p className="h-4 w-1/4 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                </div>
              </div>

              <div className="mt-8 flex gap-4 space-x-6">
                <button
                  type="button"
                  className="mb-2 mr-2 h-8 w-44 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                ></button>
                <button
                  type="button"
                  className="mb-2 mr-2 h-8 w-32 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                ></button>
              </div>
            </div>
          </div>
          {/* <div className="mt-2">
            <div className="mb-4 h-40 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"></div>
            <ul className="space-y-4 p-2">
              {[...Array(2).keys()].map((i: number) => (
                <li key={i}>
                  {" "}
                  <article>
                    <div className="mb-4 flex items-center space-x-4">
                      <div className="space-y-1 font-medium dark:text-white">
                        <p className="h-6 w-28 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                      </div>
                    </div>
                    <div className="mb-1 flex items-center">
                      <h3 className="ml-2 h-4 w-28 rounded-full bg-gray-400 text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"></h3>
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        <time
                          className="h-4 w-12 rounded-full bg-gray-400 dark:bg-gray-800"
                          title="2017-03-03 19:00"
                        ></time>
                      </p>
                    </footer>
                    <p className="h-3 w-1/4 rounded-full bg-gray-400 dark:bg-gray-800"></p>
                  </article>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default LoadingCourse;
