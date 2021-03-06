import React, { useState, Fragment } from "react";
import {
    Descriptions,
    Breadcrumb,
    Button,
    Form,
    Input,
    Select,
    Upload,
    Result
} from "antd";
import Reditor from "../editor";
import { InboxOutlined } from '@ant-design/icons';
import { LANGUAGES } from "../../../helper/languageHelper";
import { EditorState, convertToRaw } from "draft-js";
import exhibitServices from "../../../services/exhibitServices";
import { Link } from "react-router-dom";

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

export default function Exhibit({ setLoading }) {
    const [form] = Form.useForm();
    const languages = [];
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [descriptionError, setDescriptionError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [exhibitId, setExhibitId] = useState({});
    const keys = Object.keys(LANGUAGES);
    for (const key of keys) {
        languages.push(<Option key={LANGUAGES[key].code}>{LANGUAGES[key].language}</Option>)
    }

    //file handler
    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const descriptionOnBlur = () => {
        const error = !editorState.getCurrentContent().hasText();
        setDescriptionError(error);
    }

    const descriptionOnChange = (editorState) => {
        setEditorState(editorState);
    }

    const submit = () => {
        form.validateFields().then(async (values) => {
            if (!editorState.getCurrentContent().hasText()) {
                setDescriptionError(true);
            } else {
                //Submit the form
                const data = { ...values };
                data.description = convertToRaw(editorState.getCurrentContent());
                try {
                    setLoading(true);
                    const response = await exhibitServices.postNewExhibit(data);
                    setExhibitId(response.message.exhibit);
                    setSubmitSuccess(true);
                } catch (ex) {

                } finally {
                    setLoading(false);
                }
            }
        }).catch(err => {
            if (!editorState.getCurrentContent().hasText()) {
                setDescriptionError(true);
            }
        })
    }

    return (
        <div className="dashboard-content-container">
            {!submitSuccess &&
                <Fragment>
                    <Breadcrumb style={{ marginBottom: "16px" }}>
                        <Breadcrumb.Item>Exhibit</Breadcrumb.Item>
                        <Breadcrumb.Item>New</Breadcrumb.Item>
                    </Breadcrumb>
                    <Descriptions title="Add A New Exhibit" bordered />

                    <Form form={form} {...layout}>
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter exhibit\'s name' }]} className="custom-flex" validateTrigger="onBlur">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Exhibition" className="custom-flex" name="exhibition">
                            <Select placeholder="Add To An Existing Exhibition" style={{ width: "100%" }}>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
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

                        <Form.Item label="Audio/Thumbnail" className="custom-flex">
                            <Form.Item name="files" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="files" accept="audio/*,image/*"
                                    beforeUpload={() => { return false; }}>
                                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Upload an audio file or a thumbnail</p>
                                </Upload.Dragger>
                            </Form.Item>
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
                </Fragment>
            }
            {submitSuccess &&
                <Result
                    status="success"
                    title="New Exhibit Has Been Created!"
                    extra={[
                        <Button type="primary" key="view"><Link to={`/exhibit/${exhibitId}`}>View Exhibit</Link></Button>,
                        <Button key="add">Add Translation</Button>
                    ]}
                />}
        </div>
    )
}