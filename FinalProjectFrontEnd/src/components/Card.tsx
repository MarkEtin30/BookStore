function Card({ children }) {
  return (
    <div className="card p-6 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
      {/* The inner card that changes based on dark mode */}
      <div className="card-inner  dark:bg-gray-500 p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default Card;
