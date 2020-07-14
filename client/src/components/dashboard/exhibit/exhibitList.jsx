import React, { useEffect, useState } from "react";
import { Descriptions, Breadcrumb, Table, Badge } from "antd";
import exhibitService from "../../../services/exhibitServices";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
    {
        title: "Name",
        dataIndex: "Name",
        key: "name",
        sorter: true
    },
    {
        title: "Status",
        dataIndex: "Status",
        key: "status",
        responsive: ["lg"],
        sorter: true,
        render: (text) => {
            switch (text) {
                case "Created":
                    return <Badge status="processing" text="Created" />
                case "Ready":
                    return <Badge status="success" text="Ready" />
                case "Paused":
                    return <Badge status="error" text="Paused" />
            }
        }
    },
    {
        title: "Added Date",
        dataIndex: "Exhibit",
        key: "date",
        align: "center",
        responsive: ["lg"],
        sorter: true,
        render: (text) => {
            const date = moment.unix(parseInt(text.substring(0, 8), 16));
            return date.format("DD/MM/YYYY");
        }
    },
    {
        title: "Action",
        key: "action",
        align: "center",
        render: (text, record) => <Link to="#">View</Link>
    }
];

export default function ExhibitList(props) {
    const { setLoading } = props;
    const [query, setQuery] = useState({
        page: 1,
        col: "",
        order: "",
    });

    const [data, setData] = useState(null);
    const [totalDocs, setTotalDocs] = useState(0);

    useEffect(() => {
        async function getExhibits() {
            setLoading(true);
            const { total, page, exhibits } = await exhibitService.getAllExhibits(query);
            const newData = exhibits.map((value, index) => { return { key: index, ...value } });
            setData(newData);
            setTotalDocs(total);
            setLoading(false);
        };

        getExhibits();
    }, [query]);

    return (
        <div className="dashboard-content-container">
            <Breadcrumb style={{ marginBottom: "16px" }}>
                <Breadcrumb.Item>Exhibit</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <Descriptions title="All Exhibit" bordered />
            <Table
                columns={columns}
                showSorterTooltip={false}
                dataSource={data}
                pagination={{
                    total: totalDocs,
                    pageSize: 20,
                    current: query.page,
                    showTotal: (total, range) => `Total ${total} items`,
                }}
            />
        </div>
    );



}