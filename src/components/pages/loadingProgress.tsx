


const LoadingProgress = () => {

    return (
        <div>
         
            <div className="text-center justify-center items-center lg:mt-48 md:mt-24 mt-10">
                <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                ></div>
                <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            </div>

        </div>
    );
};

export default LoadingProgress;
