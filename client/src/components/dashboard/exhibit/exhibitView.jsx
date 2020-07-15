import React, { useState, useEffect, Fragment } from "react";
import { Breadcrumb, Button, Badge, Form, Input, Select, Space } from "antd";
import Reditor from "../editor";
import { EditorState, convertFromRaw } from "draft-js";
import exhibitService from "../../../services/exhibitServices";
import LanguageSelect from "../common/languageSelect";
import "./exhibit.css";
import { codeTolanguage, languageTocode } from "../../../helper/languageHelper";
const { Option } = Select;

export default function ExhibitView(props) {
    const { setLoading } = props;
    const exhibit_id = props.computedMatch.params.id;
    const [data, setData] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [descriptionError, setDescriptionError] = useState(false);
    useEffect(() => {
        async function getExhibit() {
            try {
                setLoading(true);
                const [exhibit, exhibition] = await exhibitService.getSingleExhibit(exhibit_id);
                exhibit.Description = JSON.parse(exhibit.Description);
                exhibit.defaultValues = exhibit.Translation.map((value) => { return value.Language_Code });
                // console.log(exhibit);
                setEditorState(EditorState.createWithContent(convertFromRaw(exhibit.Description)))
                setData({ exhibit, exhibition });
            } catch (ex) {

            } finally {
                setLoading(false);
            }
        }
        getExhibit();
    }, []);

    const descriptionOnBlur = () => {
        const error = !editorState.getCurrentContent().hasText();
        setDescriptionError(error);
    }

    const descriptionOnChange = (editorState) => {
        setEditorState(editorState);
    }

    return (
        <div className="dashboard-content-container">
            <Breadcrumb style={{ marginBottom: "16px" }}>
                <Breadcrumb.Item>Exhibit</Breadcrumb.Item>
                <Breadcrumb.Item>The Land Before The City</Breadcrumb.Item>
            </Breadcrumb>
            <div className="ViewHead">
                <h2 className="Heading">Exhibit</h2>
            </div>
            <Form layout="vertical">
                <Form.Item name="name" label="Exhibit Name" rules={[{ required: true, message: 'Please enter exhibit\'s name' }]} className="form-group" validateTrigger="onBlur">
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="Exhibit Description" className="form-group" required help={descriptionError && "Please enter exhibit's description"} validateStatus={descriptionError && "error"}>
                    <Reditor editorState={editorState} descriptionError={descriptionError} descriptionOnBlur={descriptionOnBlur} descriptionOnChange={descriptionOnChange} />
                </Form.Item>
                <Form.Item className="form-group">
                    <Button htmlType="button">Update</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Options</h2>
            </div>
            <Form layout="vertical" >
                <Form.Item label="Status" className="form-group">
                    <p className="text-small text-grey">
                        By selecting status, you are provided with options to control the public visibility of this exhibit. If "Paused"
                        is selected, the public will not have read access to this exhibit. If "Ready" is selected, the public will
                        have read access to this exhibit. The default status is "Paused" during creation. To enable public read access,
                        you will have to complete all names and descriptions of this exhibit, including foreign languages
                        it supports.
                    </p>

                    {data && data.exhibit.Status === "Paused" && <Badge status="error" text="Paused" className="exhibit-status" />}
                    {data && data.exhibit.Status === "Ready" && <Badge status="success" text="Ready" className="exhibit-status" />}

                    <Form.Item name="status" style={{ marginBottom: 0 }}>
                        <Select placeholder="Change the Status">
                            <Select.Option value="ready">Ready</Select.Option>
                            <Select.Option value="paused">Paused</Select.Option>
                        </Select>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Identifier" className="form-group">
                    <p className="text-small text-grey">
                        To boost access convenience for users, you can assign a number which users can use as
                        part of the access scheme to this exhibit. No more than one exhibits can use the same number. The only exemption
                        applies when more than one exhibits are having the same exhibit identifier is one exhibit is belonged to an exhibition while another
                        is either not belonged any exhibition or is belonged to a different exhibition.
                    </p>

                    <Form.Item name="identifier" style={{ marginBottom: 0 }}>
                        <Input />
                    </Form.Item>
                </Form.Item>
                <Form.Item className="form-group">
                    <Button htmlType="button">Update</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Exhibition</h2>
            </div>
            <Form layout="vertical">
                <Form.Item className="form-group">
                    <p className="text-small text-grey">
                        Add to or remove from an exhibition. Adding to an exhibition will have effect of automatically adding all languages the exhibition
                        supports to this exhibit. Removing from an exhibition have no effect for current contents.
                    </p>
                    <Form.Item name="exhibition" style={{ marginBottom: 0 }}>
                        <Select placeholder="Change the Exhibition">
                            <Select.Option value="ready">Ready</Select.Option>
                            <Select.Option value="paused">Paused</Select.Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button htmlType="button">Add</Button>
                        <Button htmlType="button" danger>Remove</Button>
                    </Space>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Language</h2>
            </div>
            <Form layout="vertical">
                <Form.Item className="form-group">
                    <p className="text-small text-grey">
                        Add or delete languages. Deleting an language will also erase its contents. Deletion will fail if the exhibit is belonged to an exhibition and the deleting language
                        is one of the languages the exhibition supports.
                    </p>
                    <Form.Item name="languages" style={{ marginBottom: 0 }}>
                        <LanguageSelect />
                    </Form.Item>
                </Form.Item>
                <Form.Item className="form-group mt-3">
                    <Button htmlType="button">Update</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Translation</h2>
            </div>
            <Form layout="vertical">
                <Form.Item className="form-group">
                    <p className="text-small text-grey">Select an language and edit its contents.</p>
                    <Form.Item name="language" style={{ marginBottom: 0 }}>
                        <Select placeholder="Select and Edit">
                            {data && data.exhibit.Translation.map((value, index) => {
                                return <Option value={value.Language_Code} key={index}><Badge status={value.Status === "Paused" ? "error" : "success"} text={codeTolanguage(value.Language_Code)} /></Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item className="form-group">
                    <Button htmlType="button">Edit</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Delete</h2>
            </div>
            <Form layout="vertical">
                <Form.Item className="form-group">
                    <p className="text-small text-grey">Delete the current exhibit. Once it is deleted, you cannot recover it.</p>
                    <Form.Item>
                        <Button htmlType="button" danger>Delete</Button>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    )
}