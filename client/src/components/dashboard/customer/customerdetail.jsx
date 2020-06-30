import React, { useEffect, useState, Fragment } from "react";
import { Badge, Breadcrumb, Button, Descriptions, Result } from "antd";
import { Link } from "react-router-dom";
import { getSingleCustomer } from "../../../services/userServices";

export default function CustomerDetail(props) {
    const customer = props.computedMatch.params.id;
    const [data, setData] = useState({ Exhibition: null, Exhibit: null, Manager: {}, Customer: {} });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState({ status_code: "400", message: "abc" });
    useEffect(() => {
        async function getCustomer() {
            try {
                props.setLoading(true);
                const data = await getSingleCustomer(customer);
                setData(data);
                setSuccess(true);
            } catch (ex) {
                if (ex.response) {
                    console.log(ex.response);
                    const ed = { ...errorDetail };
                    ed.status_code = ex.response.status
                    ed.message = ex.response.data.message;
                    setErrorDetail(ed);
                    setError(true);
                }
            } finally {
                props.setLoading(false);
            }
        }
        getCustomer();
    }, []);
    return (
        <div className="dashboard-content-container">
            {success &&
                <Fragment>
                    <Breadcrumb style={{ marginBottom: "16px" }}>
                        <Breadcrumb.Item>Customer</Breadcrumb.Item>
                        <Breadcrumb.Item>{data.Customer.Name}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Descriptions title="Customer Info" layout="vertical" bordered column={{ xs: 3, sm: 3, md: 6 }}>
                        <Descriptions.Item label="Name" span={3}>{data.Customer.Name}</Descriptions.Item>
                        <Descriptions.Item label="Status" span={1}><Badge status="success" text="Active" /></Descriptions.Item>
                        <Descriptions.Item label="Free trial" span={1}><Badge status="error" text="Expire" /></Descriptions.Item>
                        <Descriptions.Item label="Subscription" span={1}><Badge status="error" text="Expire" /></Descriptions.Item>
                    </Descriptions>

                    <Descriptions layout="vertical" bordered>
                        <Descriptions.Item label="Description">{data.Customer.Description}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions bordered layout="vertical" column={{ xs: 2 }}>
                        <Descriptions.Item label="Exhibitions" style={{ width: "50%" }} span={1}><Link to="#">{data.Exhibition}</Link></Descriptions.Item>
                        <Descriptions.Item label="Exhibits" span={1}><Link to="#">{data.Exhibit}</Link></Descriptions.Item>
                    </Descriptions>

                    <Descriptions bordered layout="vertical" column={{ xs: 2, sm: 2, md: 4 }}>
                        <Descriptions.Item label="Manager Email" span={2}>{data.Manager.Email}</Descriptions.Item>
                        <Descriptions.Item label="First Name" span={1}>{data.Manager.First_Name}</Descriptions.Item>
                        <Descriptions.Item label="Last Name" span={1}>{data.Manager.Last_Name}</Descriptions.Item>
                    </Descriptions>


                    <Descriptions bordered layout="vertical">
                        <Descriptions.Item label="Subscription Log" span={3}>None</Descriptions.Item>
                        <Descriptions.Item label="Date Added" span={3}>2020-6-30</Descriptions.Item>
                        <Descriptions.Item label="Action" span={3}>
                            <Button type="primary">Change Manager</Button>
                            <Button type="primary" style={{ marginLeft: "16px" }}>Suspend</Button>
                        </Descriptions.Item>
                    </Descriptions>
                </Fragment>
            }
            {error &&
                <Result
                    status="error"
                    title={errorDetail.status_code}
                    subTitle={errorDetail.message}
                />
            }
        </div >
    )
}