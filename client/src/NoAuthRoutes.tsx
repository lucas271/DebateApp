import { jsx } from "@emotion/react"
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import React, { ComponentType } from "react"
import { Navigate } from "react-router-dom"

export default function NoAuthRoutes ({Component} : {Component: React.ReactElement})  {
    const isAuth = false

    return <>
        {!isAuth ? Component : <Navigate to={'/'}/>}
    </>
}