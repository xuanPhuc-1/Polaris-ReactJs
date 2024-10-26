import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

const productRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/products",
				element: lazyLoad(React.lazy(() => import("@/views/products/index"))),
				meta: {
					requiresAuth: true,
					title: "Products",
					key: "products"
				}
			}
		]
	}
];

export default productRouter;
