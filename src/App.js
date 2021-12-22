import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom'

import { Header, Home, Footer } from './components'
import { NotFound } from "./components/errors";
import { Loader } from "./components/utils";
import './App.css'


const LazyTodos = lazy(() => import('./features/todos'))

function App () {
  return (
    <div id="app" className="h-screen">
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todos/*" element={<LazyTodos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
