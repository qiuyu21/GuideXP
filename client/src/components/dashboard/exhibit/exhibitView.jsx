import React, { useState } from "react";
import { Breadcrumb, Button, Form, Input, Select, Space } from "antd";
import LANGUAGES from "../../../helper/languageHelper";
import Reditor from "../editor";
import { EditorState, convertToRaw } from "draft-js";

const { Option } = Select;
export default function ExhibitView(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [descriptionError, setDescriptionError] = useState(false);
    const languages = [];
    const keys = Object.keys(LANGUAGES);
    for (const key of keys) {
        languages.push(<Option key={LANGUAGES[key].code}>{LANGUAGES[key].language}</Option>)
    }

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
                <Form.Item name="name" label="Exhibit Name" rules={[{ required: true, message: 'Please enter exhibit\'s name' }]} className="form-group">
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="Exhibit Description" required className="form-group">
                    <Reditor editorState={editorState} descriptionError={descriptionError} descriptionOnBlur={descriptionOnBlur} descriptionOnChange={descriptionOnChange} />
                </Form.Item>
                <Form.Item className="form-group">
                    <Button htmlType="button">Update</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Options</h2>
            </div>
            <Form layout="vertical">
                <Form.Item name="status" label="Status" className="form-group">
                    <p className="text-small text-grey">
                        By selecting status, you are provided with options to control the public visibility of this exhibit. If "Paused"
                        is selected, the public will not have read access to this exhibit. If "Ready" is selected, the public will
                        have read access to this exhibit. The default status is "Paused" during creation. To enable public read access,
                        you will have to complete all names and descriptions of this exhibit, including foreign languages
                        it supports.
                    </p>
                    <Select placeholder="Change the Status">
                        <Select.Option value="ready">Ready</Select.Option>
                        <Select.Option value="paused">Paused</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="identifier" label="Identifier" className="form-group">
                    <p className="text-small text-grey">
                        To boost access convenience for users, you can assign a number which users can use as
                        a part of the access scheme to this exhibit. No more than one exhibits can use the same number. The only exemption
                        applies when more than one exhibits are having the same exhibit identifier is one exhibit is belonged to an exhibition while another
                        is either not belonged any exhibition or is belonged to a different exhibition.
                    </p>
                    <Input />
                </Form.Item>
                <Form.Item className="form-group">
                    <Button htmlType="button">Update</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Exhibition</h2>
            </div>
            <Form layout="vertical">
                <Form.Item name="exhibition" className="form-group">
                    <p className="text-small text-grey">
                        Add to or remove from an exhibition. Adding to an exhibition will have effect of automatically adding all languages the exhibition
                        supports to this exhibit. Removing from an exhibition have no effect for current contents.
                    </p>
                    <Select placeholder="Change the Exhibition">
                        <Select.Option value="ready">Ready</Select.Option>
                        <Select.Option value="paused">Paused</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="exhibition" className="mt-3">
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
                <Form.Item name="languages" className="form-group">
                    <p className="text-small text-grey">
                        Add or delete languages. Deleting an language will also erasing its contents. Deletion will fail if the exhibit belongs to an exhibition and the deleting language
                        is one of the languages the exhibition supports.
                    </p>
                    <Select placeholder="Add Supportive Languages">
                        {languages}
                    </Select>
                </Form.Item>
                <Form.Item name="exhibition" className="form-group mt-3">
                    <Button htmlType="button">Update</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Translation</h2>
            </div>
            <Form layout="vertical">
                <Form.Item name="languages" className="form-group">
                    <p className="text-small text-grey">Select an language and edit its contents.</p>
                    <Select placeholder="Add Supportive Languages">
                        {languages}
                    </Select>
                </Form.Item>
                <Form.Item name="exhibition" className="form-group">
                    <Button htmlType="button">Edit</Button>
                </Form.Item>
            </Form>

            <div className="ViewHead">
                <h2 className="Heading">Delete</h2>
            </div>
            <Form layout="vertical">
                <Form.Item name="delete" className="form-group">
                    <p className="text-small text-grey">Delete the current exhibit. Once it is deleted, you cannot recover it.</p>
                    <Button htmlType="button" danger>Delete</Button>
                </Form.Item>
            </Form>
        </div>
    )
}