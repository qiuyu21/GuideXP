import React, { useState } from "react";
import {
    Descriptions,
    Breadcrumb,
    Button,
    Form,
    Input,
    Select,
    Upload
} from "antd";
import Reditor from "../editor";
import { InboxOutlined } from '@ant-design/icons';
import LANGUAGES from "../../../helper/languageHelper";
import { EditorState, convertToRaw } from "draft-js";
import exhibitServices from "../../../services/exhibitServices";

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

export default function Exhibition(props) {
    const [form] = Form.useForm();
    const languages = [];
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [descriptionError, setDescriptionError] = useState(false);
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

    const submit = async () => {
        form.validateFields().then(values => {
            if (!editorState.getCurrentContent().hasText()) {
                setDescriptionError(true);
            } else {
                //Submit the form
                const data = { ...values };
                data.description = convertToRaw(editorState.getCurrentContent());
                exhibitServices.postNewExhibit(data);
            }
        }).catch(err => {
            if (!editorState.getCurrentContent().hasText()) {
                setDescriptionError(true);
            }
        })
    }


    return (
        <div className="dashboard-content-container">
            <Breadcrumb style={{ marginBottom: "16px" }}>
                <Breadcrumb.Item>Exhibition</Breadcrumb.Item>
                <Breadcrumb.Item>New</Breadcrumb.Item>
            </Breadcrumb>
            <Descriptions title="Add A New Exhibition" bordered />

            <Form form={form} {...layout}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter exhibition\'s name' }]} className="custom-flex" validateTrigger="onBlur">
                    <Input />
                </Form.Item>

                <Form.Item label="Language" className="custom-flex" name="languages">
                    <Select
                        mode="multiple"
                        showSearch={false}
                        showArrow={true}
                        placeholder="Add Supportive Languages"
                    >
                        {languages}
                    </Select>
                </Form.Item>

                <Form.Item name="description" label="Description" className="custom-flex" required help={descriptionError && "Please enter exhibit's description"} validateStatus={descriptionError && "error"}>
                    <Reditor editorState={editorState} descriptionError={descriptionError} descriptionOnBlur={descriptionOnBlur} descriptionOnChange={descriptionOnChange} />
                </Form.Item>

                <Form.Item {...tailLayout} className="custom-flex">
                    <Button type="primary" htmlType="button" onClick={submit}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}