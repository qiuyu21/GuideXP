import React, { useState, useEffect, Fragment } from "react";
import { Breadcrumb, Button, Form, Badge, Input, Select, Space, Result, Spin } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { codeTolanguage } from "../../../../helper/languageHelper";
import exhibitService from "../../../../services/exhibitServices";
import { status_codes } from "../../../../helper/responseHelper";

export default function ExhibitTranslationView(props) {

    const { id, lan } = props.computedMatch.params;
    const [initialLoading, setInitialLoading] = useState({ loading: false, isValidParams: true, resultText: "" });
    const [exhibitData, setExhibitData] = useState(null);

    useEffect(() => {
        //First check if the language is a valid language in our file
        if (!codeTolanguage(lan)) {
            const lstatus = { ...initialLoading };
            lstatus.loading = false;
            lstatus.isValidParams = false;
            lstatus.resultText = "Not a valid langauge";
            setInitialLoading(lstatus);
            return;
        }

        //Get the exhibit
        async function getExhibit() {
            try {
                const data = await exhibitService.getSingleExhibitLanguage(id, lan);
                data.Description = JSON.parse(data.Description);
                setExhibitData(data);
                const lstatus = { ...initialLoading };
                lstatus.loading = false;
                setInitialLoading(lstatus);
            } catch (ex) {
                //langauge not exist
                if (ex.response && ex.response.status === status_codes.NOT_FOUND) {
                    const lstatus = { ...initialLoading };
                    lstatus.loading = false;
                    lstatus.isValidParams = false;
                    lstatus.resultText = ex.response.data.message;
                    setInitialLoading(lstatus);
                }
            }
        }

        getExhibit();
    }, []);

    return (
        <div className="dashboard-content-container">
            <Spin spinning={initialLoading.loading}>
                {!initialLoading.loading && initialLoading.isValidParams &&
                    <Fragment>
                        <Breadcrumb style={{ marginBottom: "16px" }}>
                            <Breadcrumb.Item><Link to="/exhibit/list">Exhibit</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={`/exhibit/${id}`}>{exhibitData && exhibitData.Name}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{codeTolanguage(lan)}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="ViewHead">
                            <h2 className="Heading">Options</h2>
                        </div>

                        <Form layout="vertical" >
                            <Form.Item label="Status" className="form-group">
                                <p className="text-small text-grey">
                                    You can only change the status to "Ready" once you have finished with all translations. To enable public access to this exhibit's translation,
                                    you must set this status to "Ready" and the status located at this exhibit's main page to "Ready".
                                </p>
                                {exhibitData && exhibitData.Translation[0].Status === "Paused" && <Badge status="error" text="Paused" className="exhibit-status" />}
                                {exhibitData && exhibitData.Translation[0].Status === "Ready" && <Badge status="success" text="Ready" className="exhibit-status" />}
                                <Form.Item name="status" style={{ marginBottom: 0 }}>
                                    <Select placeholder="Change the Status">
                                        <Select.Option value="ready">Ready</Select.Option>
                                        <Select.Option value="paused">Paused</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Permission" className="form-group">
                                <p className="text-small text-grey">
                                    You can assign write permission for this exhibit's translation to one of your staffs. The staff with
                                    write permission to this exhibit will be able to edit this translations ONLY.
                                    No other operations will be granted to this staff.
                                </p>
                                <Form.Item name="permission" style={{ marginBottom: 0 }}>
                                    <Select placeholder="Select a user to give write permission">
                                    </Select>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item className="form-group">
                                <Button htmlType="button">Update</Button>
                            </Form.Item>
                        </Form>

                        <div className="ViewHead">
                            <h2 className="Heading">Audio</h2>
                        </div>
                        <Form layout="vertical">
                            <Form.Item className="form-group">
                                <p className="text-small text-grey">
                                    Add an audio in {codeTolanguage(lan)} for this exhibit.
                            </p>
                                {/* <Form.Item name="audio" style={{ marginBottom: 0 }}>

                            </Form.Item> */}
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="button">Update</Button>
                            </Form.Item>
                        </Form>

                        <div className="ViewHead">
                            <h2 className="Heading">Translation</h2>
                        </div>
                    </Fragment>
                }
            </Spin>
            {!initialLoading.loading && !initialLoading.isValidParams && <Result status="warning" title={initialLoading.resultText} extra={<Button type="primary" key="back" onClick={() => { props.history.goBack(); }}>Go Back</Button>} />}
        </div>
    )
}
