const ErrorBox = ({error, onRetry}: {error: string; onRetry: () => void}) => {
  return (
    <>
      <p className="text-red-500">Error: {error}</p>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 rounded cursor-pointer font-bold text-white text-sm uppercase  bg-blue-500 hover:bg-blue-700 active:bg-blue-900 transition-colors">
        Retry
      </button>
    </>
  );
};

export default ErrorBox;
