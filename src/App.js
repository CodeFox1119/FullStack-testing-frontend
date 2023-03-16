/* 
** Author: Dao Wang
** mail: humblechoice.dev@gmail.com
** created: 14/03/2023
*/
import React, { Suspense } from "react"
import {
  BrowserRouter,
  Route,
  Routes} from "react-router-dom";
import routes from "./routes";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            {routes.map((route, idx) => {
              return (<Route
                path={route.path}
                element={route.element}
                key={idx}
              />
              )
            }
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
