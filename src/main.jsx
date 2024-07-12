import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import App from './App.jsx'
import ArticleForm from "./pages/ArticleForm.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <HomePage />
                    </>
                )
            },
            // ROUTE: ABOUT APP
            {
                path: "/about",
                element: (
                    <>
                        <AboutPage />
                    </>
                )
            },
            {
                path: "/contact",
                element: (
                    <>
                        <ContactPage />
                    </>
                )
            },
            {
                path: "/articles/:articleId",
                element: (
                    <>
                        <ArticlePage />
                    </>
                )
            },
            // ROUTE: NEW ARTICLE
            {
                path: "/articles/new",
                element: (
                    <>
                        <ArticleForm editMode={false} />
                    </>
                )
            },
            // ROUTE: EDIT ARTICLE
            {
                path: "/articles/edit/:articleId",
                element: (
                    <>
                        <ArticleForm editMode={true} />
                    </>
                )
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
