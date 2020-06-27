import React, { Fragment } from "react";
import { Descriptions, Breadcrumb, Table, Space } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Manager",
    dataIndex: "email",
    sorter: true,
    responsive: ["lg"],
  },
  {
    title: "Subscription End",
    dataIndex: "subscribed",
    responsive: ["md"],
  },
  {
    title: "Free Trial End",
    dataIndex: "free_trial",
    responsive: ["md"],
  },
  {
    title: "Added Date",
    dataIndex: "date",
    responsive: ["lg"],
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>View</a>
      </Space>
    ),
  },
];

export default function CustomerList() {
  return (
    <div className="table-content-container">
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Descriptions title="Customer List" bordered />
      <Table columns={columns} />
    </div>
  );
}
