import React, { useEffect, useState } from "react";
import { Descriptions, Breadcrumb, Table, Tooltip, Typography } from "antd";
import userService from "../../../services/userServices";
import { Link } from "react-router-dom";
import moment from "moment";

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
    render: (text) => {
      return <Link to="#">{text}</Link>;
    },
  },
  {
    align: "center",
    title: "On Subscription",
    dataIndex: "Subscribed",
    key: "subscribed",
    responsive: ["md"],
    render: (text, record) => {
      if (text) {
        const subscription_end = moment(record.Subscription_End);
        const now = moment().utc();
        const timezoneoffset = moment().utcOffset();
        if (now > subscription_end) {
          return (
            <Tooltip
              title={subscription_end.utcOffset(timezoneoffset).format()}
            >
              Expired
            </Tooltip>
          );
        } else {
          return (
            <Tooltip
              title={subscription_end.utcOffset(timezoneoffset).format()}
            >
              Yes
            </Tooltip>
          );
        }
      } else return "No";
    },
  },
  {
    align: "center",
    title: "On Free Trial",
    dataIndex: "Free_Trial",
    key: "free_trial",
    responsive: ["md"],
    render: (text, record) => {
      if (text) {
        //customer has free trial recorded
        const free_end = moment(record.Free_Trial_End);
        const now = moment().utc();
        const timezoneoffset = moment().utcOffset();
        if (now > free_end) {
          return (
            <Tooltip title={free_end.utcOffset(timezoneoffset).format()}>
              Expired
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={free_end.utcOffset(timezoneoffset).format()}>
              Yes
            </Tooltip>
          );
        }
      } else {
        return "No";
      }
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
    align: "center",
    title: "Action",
    key: "action",
    render: (text, record) => <Link to={`/customer/details/${record.Customer}`}>View</Link>
  },
];

export default function CustomerList() {
  const [query, setQuery] = useState({
    page: 1,
    col: "",
    order: "",
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [totalDocs, setTotalDocs] = useState(0);

  useEffect(() => {
    async function getCustomers() {
      setLoading(true);
      const { total, page, results } = await userService.getCustomers(query);
      const newData = results.map((value, index) => {
        return { key: index, ...value };
      });
      console.log(newData);
      setData(newData);
      setTotalDocs(total);
      setLoading(false);
    }
    getCustomers();
  }, [query]);

  const handleTableChange = (pagination, filters, sorter) => {
    setQuery({
      page: pagination.current,
      col: sorter.columnKey,
      order: sorter.order,
    });
  };

  return (
    <div className="table-content-container">
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <Descriptions title="Customer List" bordered />
      <Table
        loading={loading}
        columns={columns}
        showSorterTooltip={false}
        dataSource={data}
        pagination={{
          total: totalDocs,
          pageSize: 20,
          current: query.page,
          showTotal: (total, range) => `Total ${total} items`,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}
