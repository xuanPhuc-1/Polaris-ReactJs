import { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import { setLanguage } from "@/redux/modules/global/action";
import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers/index";
import useTheme from "@/hooks/useTheme";
import enUS from "antd/lib/locale/en_US";
import i18n from "i18next";
import { BrowserRouter } from "react-router-dom";
import "@shopify/polaris/build/esm/styles.css";

const App = (props: any) => {
	const { language, assemblySize, themeConfig, setLanguage } = props;
	const [i18nLocale, setI18nLocale] = useState(enUS); // Đặt tiếng Anh làm mặc định

	// Toàn cục sử dụng theme
	useTheme(themeConfig);

	// Thiết lập ngôn ngữ quốc tế hóa của Ant Design
	const setAntdLanguage = () => {
		// Nếu có ngôn ngữ trong redux, thiết lập theo redux, nếu không dùng tiếng Anh mặc định
		if (language === "zh") {
			setI18nLocale(enUS);
		} else {
			setI18nLocale(enUS); // Mặc định sử dụng tiếng Anh
		}
	};

	useEffect(() => {
		// Sử dụng tiếng Anh làm mặc định nếu không có thiết lập nào khác
		const selectedLanguage = language || "en";
		i18n.changeLanguage(selectedLanguage);
		setLanguage(selectedLanguage);
		setAntdLanguage();
	}, [language]);

	return (
		<BrowserRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</BrowserRouter>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
