import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-4xl mb-8"><span className="text-9xl">404</span>Not Found_</h2>
      <p className="text-center text-lg text-gray-300 mb-6">
        The page you are looking for might have been removed,
        had its name changed or is temporarily unavailable.
      </p>
      <div className="space-x-4">
        <button onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-full font-medium border border transition duration-500
                           hover:bg-white hover:text-black hover:border-black">
          Go back
        </button>

        <Link to="/">
          <button className="px-6 py-2 rounded-full font-medium border border transition duration-500
                             hover:bg-white hover:text-black hover:border-black">
            Go to homepage
          </button>
        </Link>
      </div>
    </div>
  )
}
export default NotFound
