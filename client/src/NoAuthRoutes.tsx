import React from "react"
import { Navigate } from "react-router-dom"

export default function NoAuthRoutes ({Component} : {Component: React.ReactElement})  {
    const isAuth = false

    return <>
        {!isAuth ? Component : <Navigate to={'/'}/>}
    </>
}