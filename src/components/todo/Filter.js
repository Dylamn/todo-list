import { Link } from "react-router-dom";

const Filter = (props) => (
  <>
    <Link to="/all">
      <button className="px-3 py-2 sm:mx-2 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring">
        All
      </button>
    </Link>
    <Link to="/done">
      <button className="px-3 py-2 sm:mx-2 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring">
        Finished
      </button>
    </Link>
    <Link to="/active">
      <button className="px-3 py-2 sm:mx-2 rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring">
        In progress
      </button>
    </Link>
  </>
)
export default Filter