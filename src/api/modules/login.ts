import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};

// * Menu List Hardcoded Data
const myMenuList = [
	{
		icon: "HomeOutlined",
		title: "Dashboard",
		path: "/dashboard"
	},
	{
		icon: "TableOutlined",
		title: "Products",
		path: "/products"
	},
	{
		icon: "SettingOutlined",
		title: "Settings",
		path: "/settings"
	}
];

// * Function to Get Menu List
export const getMenuList = () => {
	// Return data wrapped in an object to match expected structure
	return Promise.resolve({ data: myMenuList });
};
