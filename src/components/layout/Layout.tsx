import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode; // 👈️ type children
};

const LayOut = (props: LayoutProps) => {
  return (
    <main className="relative overflow-hidden duration-300 dark:bg-gray-900 dark:text-white">
      <Head>
        <title>Course Management</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Course Management" key="desc" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}

      <div className="min-h-screen">
        {props.children ? props.children : null}
      </div>
      {/* <Footer /> */}
    </main>
  );
};
export default LayOut;
