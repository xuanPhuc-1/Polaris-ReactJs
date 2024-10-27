import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabs/action";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// Login
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);

			// Hardcode kiểm tra user_name và password
			const validUsers = [
				{ user_name: "admin", password: md5("123456") },
				{ user_name: "user", password: md5("123456") }
			];

			// Hash password nhập vào
			loginForm.password = md5(loginForm.password);

			// Kiểm tra nếu user hợp lệ
			const user = validUsers.find(u => u.user_name === loginForm.username && u.password === loginForm.password);

			if (user) {
				// Cấp token tạm thời (giả lập)
				const temporaryAccessToken = "temporary_access_token_example";
				setToken(temporaryAccessToken);
				setTabsList([]);
				message.success("Login successful!");
				navigate(HOME_URL);
			} else {
				message.error("Invalid username or password");
			}
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "Please enter username" }]}>
				<Input placeholder="Username: admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "Please enter password" }]}>
				<Input.Password autoComplete="new-password" placeholder="Password: 123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(LoginForm);
