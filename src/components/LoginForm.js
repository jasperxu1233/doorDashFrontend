import { Button, Form, Input, message } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils"; // .. 表示向上上走两层

class LoginForm extends React.Component {
    state = {
        loading: false,  //loading 可以进行点击后的加载
    };

     //提到表单想两点：表单数据的收集和校验：
    //表单数据的校验 rules
    //表达数据的收集 onFinish
    onFinish = (values) => {
        //step1: set login true ： 加载中
        //step2: send login request( call login api) to the server
        //step3：deal with login status -> logged  in or not
        //step4: set loading false
        this.setState({
            loading: true,
        });
        login(values)
            .then(() => {
                message.success(`Login Successful`);
                this.props.Onsuccess();                        //这里如果登录成功的话，通过onSuccess函数的调用将状态回传给父组件
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };

    render = () => {
        return (
            <Form
                name="normal_login"
                onFinish={this.onFinish}
                style={{
                    width: 300,
                    margin: "auto",
                }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your Username!" }]} // 通过rules可以做validation
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your Password!" }]}
                >
                    <Input.Password                 // input.password 会加上小眼睛
                        prefix={<LockOutlined />}
                        placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );                                           //触发了Log in之后由于“submit” 这个htmlType会触发rerender所以又<Form>所以会触发onFinish，由onFinish进行数据收集。
    };                                           // loading 是通过在button下面的loading实现。
}

export default LoginForm;