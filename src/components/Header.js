import { Link, NavLink } from "react-router-dom";
import Styles from './Header.module.scss'
import { combineStyles } from "../utils";
import { useRef } from "react";

const Header = () => {
  const togglerRef = useRef(null)

  const toggleMenu = () => {
    const expanded = togglerRef.current.classList.toggle(Styles.opened)

    togglerRef.current.setAttribute('aria-expanded', expanded.toString())
  }


  return (
    <header className="w-full shadow">
      <nav className="flex items-center justify-between px-8 py-2">
        <div className="flex flex-row items-center">
          <div className="h-8">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   className="w-full h-full fill-current transition duration-200 hover:text-gray-300">
                <path
                  d="M23.334 11.96c-.713-.726-.872-1.829-.393-2.727.342-.64.366-1.401.064-2.062-.301-.66-.893-1.142-1.601-1.302-.991-.225-1.722-1.067-1.803-2.081-.059-.723-.451-1.378-1.062-1.77-.609-.393-1.367-.478-2.05-.229-.956.347-2.026.032-2.642-.776-.44-.576-1.124-.915-1.85-.915-.725 0-1.409.339-1.849.915-.613.809-1.683 1.124-2.639.777-.682-.248-1.44-.163-2.05.229-.61.392-1.003 1.047-1.061 1.77-.082 1.014-.812 1.857-1.803 2.081-.708.16-1.3.642-1.601 1.302s-.277 1.422.065 2.061c.479.897.32 2.001-.392 2.727-.509.517-.747 1.242-.644 1.96s.536 1.347 1.17 1.7c.888.495 1.352 1.51 1.144 2.505-.147.71.044 1.448.519 1.996.476.549 1.18.844 1.902.798 1.016-.063 1.953.54 2.317 1.489.259.678.82 1.195 1.517 1.399.695.204 1.447.072 2.031-.357.819-.603 1.936-.603 2.754 0 .584.43 1.336.562 2.031.357.697-.204 1.258-.722 1.518-1.399.363-.949 1.301-1.553 2.316-1.489.724.046 1.427-.249 1.902-.798.475-.548.667-1.286.519-1.996-.207-.995.256-2.01 1.145-2.505.633-.354 1.065-.982 1.169-1.7s-.135-1.443-.643-1.96zm-12.584 5.43l-4.5-4.364 1.857-1.857 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.642z" />
              </svg>
            </Link>
          </div>
          <div className="p-4">
            <ul className="inline-flex">
              <NavLink to="/todos" className="transition-colors duration-200 text-gray-300 hover:text-white">
                Todos
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div onClick={toggleMenu} className="flex justify-end rounded-full w-20 p-1 border-2 cursor-pointer">
            <div className="relative mr-1">
              <button ref={togglerRef} className={Styles['hamburger-menu']} aria-label="Main Menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
                  <path className={combineStyles(Styles.line, Styles['line-one'])}
                        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                  <path className={combineStyles(Styles.line, Styles['line-two'])}
                        d="M 20,50 H 80" />
                  <path className={combineStyles(Styles.line, Styles['line-three'])}
                        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                </svg>
              </button>

              <div className={combineStyles(
                Styles['dropdown-menu'], "absolute top-11 -left-24 w-44 rounded bg-primary-variant border border-gray-500 z-10"
              )}>
                <ul className={Styles["dropdown-list"]}>
                  <li>
                    <Link to="#" className="text-sm text-gray-400 hover:text-white hover:bg-gray-600 block px-4 py-2">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-sm text-gray-400 hover:text-white hover:bg-gray-600 block px-4 py-2">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-sm text-gray-400 hover:text-white hover:bg-gray-600 block px-4 py-2">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-full p-1 border-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-5 fill-current">
                <path
                  d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header
