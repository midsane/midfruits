import GamePage from "./pages/game";
import { HomePage } from "./pages/home";
import "./App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./pages/root"
import { RecoilRoot } from "recoil";


const router = createBrowserRouter([
  {
    path: "/", element: <Root />, children: [
      {
        path: "home", element: <HomePage />
      },

    ]
  },
  {
    path: "/room/:gameId", element: <GamePage />
  }

])

export default function App() {
  return (<RecoilRoot>
    <RouterProvider router={router} >
    </RouterProvider>
  </RecoilRoot>)
}