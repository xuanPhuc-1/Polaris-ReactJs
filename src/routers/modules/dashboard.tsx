// import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import React from "react";

// 首页模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dashboard",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/polaris/index"))),
				meta: {
					requiresAuth: true,
					title: "Dashboard",
					key: "dashboard"
				}
			}
		]
	}
];

export default dashboardRouter;
