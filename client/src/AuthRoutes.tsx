import React, { ComponentProps, ComponentType } from "react";
import { Navigate } from "react-router-dom"



export default function AuthRoutes ({Component} : {Component: React.ElementType})  {
    const isAuth = true

    return <>
        {isAuth ? Component: <Navigate to={'/'}/>}
    </>
}