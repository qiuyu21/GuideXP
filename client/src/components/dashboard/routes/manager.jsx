import React from "react";
import { Switch, Redirect } from "react-router-dom";
import RouteProtected from "../../protectedRoute";
import Exhibit from "../exhibit/exhibit";
import Exhibition from "../exhibition/exhibition";
import ManagerDashboard from "../role/managerDashboard";

export default function ManagerRoutes({ setLoading }) {
    return (
        <Switch>
            <RouteProtected
                path="/exhibit/new"
                component={Exhibit}
                setLoading={setLoading}
            />
            <RouteProtected
                path="/exhibition/new"
                component={Exhibition}
                setLoading={setLoading}
            />
            <RouteProtected path="/dashboard" component={ManagerDashboard} />
            <Redirect from="/" to="/dashboard" component={ManagerDashboard} />
        </Switch>
    )
}