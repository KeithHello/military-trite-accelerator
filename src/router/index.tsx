import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Home from "../views";

const Error = lazy(() => import("../views/error"));
const Success = lazy(() => import("../views/success"));

const withLoadingComponent = (comp: JSX.Element) => {
    return <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>;
};

const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/error",
        element: withLoadingComponent(<Error />),
    },
    {
        path: "/success",
        element: withLoadingComponent(<Success />),
    },
    // 404
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];

export default routes;
