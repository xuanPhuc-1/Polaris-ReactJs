import { useRef } from "react";
import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import PasswordModal from "./PasswordModal";
import InfoModal from "./InfoModal";
import avatar from "@/assets/images/avatar.png";

const AvatarIcon = (props: any) => {
	const { setToken } = props;
	const navigate = useNavigate();

	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}
	const passRef = useRef<ModalProps>(null);
	const infoRef = useRef<ModalProps>(null);

	// Logout
	const logout = () => {
		Modal.confirm({
			title: "Friendly Reminder 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "Are you sure you want to log out?",
			okText: "Confirm",
			cancelText: "Cancel",
			onOk: () => {
				setToken("");
				message.success("Successfully logged out!");
				navigate("/login");
			}
		});
	};

	// Dropdown Menu
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span className="dropdown-item">Home</span>,
					onClick: () => navigate(HOME_URL)
				},
				{
					key: "2",
					label: <span className="dropdown-item">Profile Info</span>,
					onClick: () => infoRef.current!.showModal({ name: 11 })
				},
				{
					key: "3",
					label: <span className="dropdown-item">Change Password</span>,
					onClick: () => passRef.current!.showModal({ name: 11 })
				},
				{
					type: "divider"
				},
				{
					key: "4",
					label: <span className="dropdown-item">Log Out</span>,
					onClick: logout
				}
			]}
		></Menu>
	);
	return (
		<>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
				<Avatar size="large" src={avatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(AvatarIcon);
