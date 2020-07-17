import React, { Fragment, useState } from "react";
import {
  Form,
  Input,
  Button,
  Descriptions,
  DatePicker,
  Breadcrumb,
  Spin,
  Result,
} from "antd";
import moment from "moment";
import userService from "../../../services/userServices";
import { status_codes } from "../../../helper/responseHelper";
import { Link } from "react-router-dom";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export default function NewCustomer(props) {
  const { setLoading: submitLoading } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ isSuccess: false, successMsg: {} });

  const disableDate = (currentDate) => {
    return currentDate && currentDate < moment().endOf("day");
  };

  const doSubmit = async (values) => {
    try {
      submitLoading(true);
      const response = await userService.postNewCustomer(values);
      const succ = { ...success };
      succ.isSuccess = true;
      succ.successMsg = response;
      setSuccess(succ);
    } catch (ex) {
      if (ex.response && ex.response.status === status_codes.FORBIDDEN) {
        //Email has been registered
        form.setFields([{ name: "email", errors: [ex.response.data.message] }]);
      }
    }
    submitLoading(false);

  };

  return (
    <div className="dashboard-content-container">
      <Spin spinning={loading}>
        {!success.isSuccess && (
          <Fragment>
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
                //calculate the days differences
                if (values.days) {
                  const now = moment().startOf("day");
                  const diff = values.days.diff(now, "days");
                  values.days = diff;
                } else values.days = 0;
                doSubmit(values);
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
              <Form.Item name="days" label="Free Trial" className="custom-flex">
                <DatePicker disabledDate={disableDate} />
              </Form.Item>
              <Form.Item {...tailLayout} className="custom-flex">
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Fragment>
        )}
        {success.isSuccess && <Result status="success" title={success.successMsg.message} extra={[
          <Button type="primary" key="list"><Link to="/customer/list">Customer List</Link></Button>,
          <Button key="view"><Link to={`/customer/details/${success.successMsg.id}`}>View Customer</Link></Button>,
        ]} />}
      </Spin>
    </div>
  );
}
