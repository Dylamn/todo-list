import { useLocation } from "react-router-dom";
import { usePrevious } from "../../hooks";

const ScrollToTop = ({children}) => {
  const location = useLocation()
  const previousLocation = usePrevious(location)

  if (location !== previousLocation) {
    window.scrollTo(0, 0)
  }

  return children
}

export default ScrollToTop