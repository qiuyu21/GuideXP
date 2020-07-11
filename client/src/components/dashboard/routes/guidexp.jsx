import React from "react";
import { Switch, Redirect } from "react-router-dom";
import RouteProtected from "../../protectedRoute";
import NewCustomer from "../customer/newcustomer";
import CustomerList from "../customer/customerlist";
import CustomerDetail from "../customer/customerdetail";
import GuidexpDashboard from "../role/guidexpDashboard";

export default function GuidexpRoutes({ setLoading }) {
    return (
        <Switch>
            <RouteProtected
                path="/customer/new"
                component={NewCustomer}
                setLoading={setLoading}
            />
            <RouteProtected
                path="/customer/list"
                component={CustomerList}
                setLoading={setLoading}
            />
            <RouteProtected
                path="/customer/details/:id"
                component={CustomerDetail}
                setLoading={setLoading}
            />
            <RouteProtected path="/dashboard" component={GuidexpDashboard} />
            <Redirect from="/" to="/dashboard" component={GuidexpDashboard} />
        </Switch>
    )
}