import React, { useEffect, useState } from "react";
import { Badge, Breadcrumb, Button, Descriptions, Spin } from "antd";

export default function CustomerDetail(props) {
    const customer_id = props.computedMatch.params.id;
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, []);

    const [data, setData] = useState({});

    return (
        <div className="dashboard-content-container">
            <Spin spinning={loading}>
                <Breadcrumb style={{ marginBottom: "16px" }}>
                    <Breadcrumb.Item>Customer</Breadcrumb.Item>
                    <Breadcrumb.Item>{customer_id}</Breadcrumb.Item>
                </Breadcrumb>

                <Descriptions title="Customer Info" layout="vertical" bordered column={{ xs: 3, sm: 3, md: 6 }}>
                    <Descriptions.Item label="Name" span={3}>National Capital Exhibition</Descriptions.Item>
                    <Descriptions.Item label="Status" span={1}><Badge status="success" text="Active" /></Descriptions.Item>
                    <Descriptions.Item label="Free trial" span={1}><Badge status="error" text="Expire" /></Descriptions.Item>
                    <Descriptions.Item label="Subscription" span={1}><Badge status="error" text="Expire" /></Descriptions.Item>
                </Descriptions>

                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Description">Popular visitor center featuring educational exhibits on how Canberra was designed & a city diorama.</Descriptions.Item>
                </Descriptions>

                <Descriptions bordered layout="vertical" column={{ xs: 2 }}>
                    <Descriptions.Item label="Exhibition" style={{ width: "50%" }} span={1}>1</Descriptions.Item>
                    <Descriptions.Item label="Exhibit" span={1}>10</Descriptions.Item>
                </Descriptions>

                <Descriptions bordered layout="vertical" column={{ xs: 2, sm: 2, md: 4 }}>
                    <Descriptions.Item label="Manager Email" span={2}>uqiuyu@outlook.com</Descriptions.Item>
                    <Descriptions.Item label="First Name" span={1}>Yu</Descriptions.Item>
                    <Descriptions.Item label="Last Name" span={1}>Qiu</Descriptions.Item>
                </Descriptions>


                <Descriptions bordered layout="vertical">
                    <Descriptions.Item label="Subscription Log" span={3}>None</Descriptions.Item>
                    <Descriptions.Item label="Added Date" span={3}>2020-6-30</Descriptions.Item>
                    <Descriptions.Item label="Action" span={3}>
                        <Button type="primary">Change Manager</Button>
                        <Button type="primary" style={{ marginLeft: "16px" }}>Suspend</Button>
                    </Descriptions.Item>
                </Descriptions>

            </Spin>
        </div >
    )
}