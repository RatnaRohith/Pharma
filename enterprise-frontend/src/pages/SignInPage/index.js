import { Form, Input, Button, Checkbox, message } from "antd";
import auth from "../../services/auth";
import { useEffect } from "react";
import { RadarChartOutlined } from "@ant-design/icons";

const SignInPage = (props) => {
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { username, password } = values;
    try {
      const response = await auth.login(username, password);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("ex", ex.response.data);
        // toast.error(ex.response.data);
        message.error(ex.response.data)
      }
    }
  };

  useEffect(() => {
    const user = auth.getCurrentUser();
    console.log("user : ", user);
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-form-wrapper" style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1 style={{ fontSize: "20px", margin: "0 0 15px 0" }}>
            <RadarChartOutlined />
            {"\t"}
            PharmaZeal
        </h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ width: "266px", height: "34px" }} value />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password style={{ width: "266px", height: "34px" }} />
          </Form.Item>
          
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignInPage;
