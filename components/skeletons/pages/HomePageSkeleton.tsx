
const HomePageSkeleton = () => {
    return (
        <div className="flex flex-col h-screen animate-pulse bg-white dark:bg-gray-900">
            <nav className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-800 mx-10">
                <div className="flex items-center">
                    <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </nav>
            <header className="text-center h-[25rem] items-center justify-center flex flex-col mt-[10%] bg-white dark:bg-gray-900">
                <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 w-80 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-12 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </header>
            {/* <footer className="p-4 border-t border-gray-200 mt-auto ">
                <div className="h-6 w-full bg-gray-300 rounded"></div>
            </footer> */}
        </div>
    );
};

export default HomePageSkeleton;