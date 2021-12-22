import { Link, useLocation } from "react-router-dom";
import { stringify } from "querystring";

const Filter = () => {
  const location = useLocation()

  return (
    <>
      <Link to={location.pathname + "?" + stringify({filter: 'all'})}>
        <button className="px-3 py-2 sm:mx-2 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring">
          All
        </button>
      </Link>
      <Link to={location.pathname + "?" + stringify({filter: 'done'})}>
        <button className="px-3 py-2 sm:mx-2 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring">
          Finished
        </button>
      </Link>
      <Link to={location.pathname + "?" + stringify({filter: 'active'})}>
        <button className="px-3 py-2 sm:mx-2 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring">
          In progress
        </button>
      </Link>
    </>
  )
}

export default Filter