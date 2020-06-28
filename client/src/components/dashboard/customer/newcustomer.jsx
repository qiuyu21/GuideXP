import React from "react";
import {
  Form,
  Input,
  Button,
  Descriptions,
  DatePicker,
  Breadcrumb,
} from "antd";
import moment from "moment";
import userService from "../../../services/userServices";
import httpHelper from "../../../helper/httpHelper";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export default function NewCustomer() {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const disableDate = (currentDate) => {
    return currentDate && currentDate < moment().endOf("day");
  };

  const doSubmit = (values) => {
    try {
      const response = userService.postNewCustomer(values);
    } catch (ex) {
      if (ex.response && ex.response.status === httpHelper.BAD_REQUEST) {
      }
    }
  };

  return (
    <div className="dashboard-content-container">
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
        <Breadcrumb.Item>New</Breadcrumb.Item>
      </Breadcrumb>
      <Descriptions title="Add A New Customer" bordered />
      <Form
        form={form}
        {...layout}
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Form.Item
          label="Customer Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Customer name is required",
              whitespace: true,
            },
          ]}
          className="custom-flex"
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Customer Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Customer description is required",
              whitespace: true,
            },
          ]}
          className="custom-flex"
        >
          <TextArea rows={4} allowClear />
        </Form.Item>
        <Form.Item
          label="Manager E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          className="custom-flex"
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Manager First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "First name is required",
              whitespace: true,
            },
          ]}
          className="custom-flex"
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Manager Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Last name is required",
              whitespace: true,
            },
          ]}
          className="custom-flex"
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="free-trial"
          label="Free Trial Until"
          className="custom-flex"
        >
          <DatePicker disabledDate={disableDate} />
        </Form.Item>
        <Form.Item {...tailLayout} className="custom-flex">
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
