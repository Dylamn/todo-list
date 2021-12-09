import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="main-wrapper flex flex-col flex-initial">
      <div className="flex flex-col items-center py-16 bg-primary-variant mb-10">
        <h1 className="text-6xl font-bold mb-8">Todos</h1>
        <p className="text-xl mx-8 sm:mx-0">
          An application created to learning React and Redux. And a bit of SASS too.
        </p>
        <div className="p-6 space-x-2 xs:space-x-4">
          <Link to="todos">
            <button className="rounded-md px-4 py-2 bg-blue-600">Get started</button>
          </Link>
          <button className="rounded-md px-4 py-2 bg-green-600">Learn More</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 sm:grid-rows-1 gap-4 p-6">
        <div className="col-span-2 xl:col-span-1">
          <div className="mx-auto w-28 h-28">
            <img src="images/javascript-logo.png" alt="JavaScript Logo" className="rounded-md" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl my-4">
              Javascript
            </h2>
            <hr className="items-center w-16" />
            <p className="lg:text-justify p-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aut dolor dolorem earum enim eum
              fugiat fugit laborum laudantium maxime molestias nobis quisquam reprehenderit, repudiandae rerum similique
              tempora velit?
            </p>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <div className="mx-auto w-28 h-28">
            <img src="images/react-logo.png" alt="React Logo" className="max-w-full h-auto" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl my-4">
              React
            </h2>
            <hr className="items-center w-16" />
            <p className="lg:text-justify p-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio est expedita porro provident
              ratione unde velit. Architecto doloribus eum ipsam nihil quibusdam veniam veritatis! Aspernatur mollitia
              quas quis reiciendis?
            </p>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <div className="mx-auto w-28 h-28">
            <img src="images/redux-logo.png" alt="Redux Logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl my-4">
              Redux
            </h2>
            <hr className="items-center w-16" />
            <p className="lg:text-justify p-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aut dolor dolorem earum enim eum
              fugiat fugit laborum laudantium maxime molestias nobis quisquam reprehenderit, repudiandae rerum similique
              tempora velit?
            </p>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-1">
          <div className="mx-auto w-28 h-28">
            <img src="images/sass-logo.svg" alt="Sass Logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl my-4">
              Sass
            </h2>
            <hr className="items-center w-16" />
            <p className="lg:text-justify p-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aut dolor dolorem earum enim eum
              fugiat fugit laborum laudantium maxime molestias nobis quisquam reprehenderit, repudiandae rerum similique
              tempora velit?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
