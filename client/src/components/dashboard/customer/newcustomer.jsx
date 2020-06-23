import React from "react";
import { Form, Input, Button, Descriptions } from "antd";

export default function NewCustomer() {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  return (
    <React.Fragment>
      <Descriptions title="Add A New Customer" bordered />
      <Form form={form} layout="vertical">
        <Form.Item
          label="Customer Name"
          name="customer_name"
          rules={[
            {
              required: true,
              message: "Customer name is required",
              whitespace: true,
            },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Customer Description"
          name="customer_description"
          rules={[
            {
              required: true,
              message: "Customer description is required",
              whitespace: true,
            },
          ]}
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
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </React.Fragment>
  );
}
