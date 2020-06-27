import React, { Fragment, useEffect, useState } from "react";
import { Descriptions, Breadcrumb, Table, Space, Spin } from "antd";
import userService from "../../../services/userServices";

const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "name",
    sorter: true,
  },
  {
    title: "Manager",
    dataIndex: "Email",
    key: "email",
    sorter: true,
    responsive: ["lg"],
  },
  {
    title: "Subscription End",
    dataIndex: "subscribed",
    key: "subscribed",
    responsive: ["md"],
  },
  {
    title: "Free Trial End",
    dataIndex: "Free_Trial_End",
    key: "free_trial",
    responsive: ["md"],
    render: (text) => {
      const date = new Date(text);
      return date.toDateString().substring(4);
    },
  },
  {
    title: "Added Date",
    dataIndex: "Customer",
    key: "date",
    responsive: ["lg"],
    render: (text) => {
      // return parseInt(text.substring(0,9));
      const date = new Date(parseInt(text.substring(0, 8), 16) * 1000);
      return date.toDateString().substring(4);
    },
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
  const [page, setPage] = useState(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getCustomers() {
      const data = await userService.getCustomers();
      const newData = data.map((value, index) => {
        return { key: index, ...value };
      });
      setData(newData);
    }
    getCustomers();
  }, []);

  return (
    <div className="table-content-container">
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Descriptions title="Customer List" bordered />
      <Table
        columns={columns}
        size="small"
        showSorterTooltip={false}
        dataSource={data}
      />
    </div>
  );
}
