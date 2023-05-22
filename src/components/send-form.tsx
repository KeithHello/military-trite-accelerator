import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import { FormInstance } from "antd/lib/form";

interface SendFormProps {
  form: FormInstance;
  handleSend: () => Promise<void> | void;
}

const SendForm: FunctionComponent<SendFormProps> = ({form, handleSend}) => {

  return (

    <Form
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 30 }}
      style={{ maxWidth: 800 }}
      onFinish={handleSend}>

      <div>Who are you?</div>
      <Form.Item name="username">
        <Input placeholder="charlie.brown" />
      </Form.Item>

      <div>What do you want for christmas?</div>
      <Form.Item name="wish">
        <Input.TextArea
          rows={10}
          cols={45}
          maxLength={100}
          placeholder="Gifts!"
        ></Input.TextArea>
      </Form.Item>
      <Button type="primary" htmlType="submit">Send</Button>
    </Form>
  );
};

export default SendForm;