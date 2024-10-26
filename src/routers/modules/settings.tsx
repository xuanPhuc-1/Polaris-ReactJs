// import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import React from "react";

// 首页模块
const settingRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/settings",
				element: lazyLoad(React.lazy(() => import("@/views/settings/index"))),
				meta: {
					requiresAuth: true,
					title: "Settings",
					key: "settings"
				}
			}
		]
	}
];

export default settingRouter;
