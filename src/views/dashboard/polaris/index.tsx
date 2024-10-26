/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Page, Grid, LegacyCard, AppProvider, Button, Text, Box, Layout, Popover, DatePicker } from "@shopify/polaris";
import { Line as LineChart, Bar as ColumnChart } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import enTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { Space } from "antd";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

interface DateRange {
	start: Date;
	end: Date;
}

export default function DashboardPage() {
	const [selectedDates, setSelectedDates] = useState<DateRange>({
		start: new Date(),
		end: new Date()
	});

	const [popoverActive, setPopoverActive] = useState<boolean>(false);
	const [month, setMonth] = useState<number>(new Date().getMonth());
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [totalSubscriptions, setTotalSubscriptions] = useState<number>(0);
	const [totalRevenue, setTotalRevenue] = useState<number>(0);

	// State để lưu trữ dữ liệu đã lọc
	const [lineChartFilteredData, setLineChartFilteredData] = useState<number[]>([25, 30, 45, 60, 55, 70, 80]);
	const [columnChartFilteredData, setColumnChartFilteredData] = useState<number[]>([
		5000, 6000, 5500, 7000, 6500, 7200, 7500, 8000, 7800, 8300, 8500, 9000
	]);

	const togglePopover = (): void => setPopoverActive(!popoverActive);

	const handleDateChange = (value: DateRange): void => {
		setSelectedDates(value);
	};

	const handleMonthChange = (month: number, year: number): void => {
		setMonth(month);
		setYear(year);
	};

	// Dữ liệu giả lập cho LineChart (subscriptions)
	const originalLineData = {
		labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
		datasets: [
			{
				label: "Subscriptions",
				data: [25, 30, 45, 60, 55, 70, 80], // Số lượng đăng ký theo ngày
				borderColor: "rgba(255,99,132,1)",
				fill: false
			}
		]
	};

	const lineData = {
		...originalLineData,
		labels: originalLineData.labels.slice(-lineChartFilteredData.length),
		datasets: [
			{
				...originalLineData.datasets[0],
				data: lineChartFilteredData
			}
		]
	};

	// Dữ liệu giả lập cho ColumnChart (revenue)
	const columnData = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		datasets: [
			{
				label: "Revenue",
				data: [5000, 6000, 5500, 7000, 6500, 7200, 7500, 8000, 7800, 8300, 8500, 9000], // Doanh thu theo tháng
				backgroundColor: "rgba(153, 102, 255, 0.6)"
			}
		]
	};

	const columnChartData = {
		...columnData,
		labels: columnData.labels.slice(new Date(selectedDates.start).getMonth(), new Date(selectedDates.end).getMonth() + 1),
		datasets: [
			{
				...columnData.datasets[0],
				data: columnChartFilteredData
			}
		]
	};

	const setYesterday = () => {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);
		setSelectedDates({ start: yesterday, end: today });
	};

	const setLast7Days = () => {
		const today = new Date();
		const last7Days = new Date();
		last7Days.setDate(today.getDate() - 7); // Tính 7 ngày bao gồm cả hôm nay
		setSelectedDates({ start: last7Days, end: today });
	};

	const setLastMonth = () => {
		const today = new Date();
		const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
		const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Ngày cuối cùng của tháng trước
		setSelectedDates({ start: firstDayOfLastMonth, end: lastDayOfLastMonth });
	};

	const setThisYear = () => {
		const today = new Date();
		const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
		const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
		setSelectedDates({ start: firstDayOfYear, end: lastDayOfYear });
	};

	const resetDates = () => {
		setSelectedDates({ start: new Date(), end: new Date() });
	};

	const filterSubscriptions = (startDate: Date, endDate: Date): void => {
		const subscriptionData: number[] = originalLineData.datasets[0].data;

		const daysInRange = Math.min(7, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));

		// Tạo mảng lọc subscriptions từ ngày hiện tại, ngược về ngày đã chọn
		const filteredData = subscriptionData.slice(-daysInRange).filter(value => value !== null && value !== undefined); // Loại bỏ các giá trị null hoặc undefined

		setLineChartFilteredData(filteredData);

		const total: number = filteredData.reduce((acc, val) => acc + val, 0);
		setTotalSubscriptions(total);
	};

	// Hàm lọc cho ColumnChart (Revenue)
	const filterRevenue = (startDate: Date, endDate: Date): void => {
		const revenueData: number[] = columnData.datasets[0].data;

		const startMonth: number = new Date(startDate).getMonth();
		const endMonth: number = new Date(endDate).getMonth();
		const monthsInRange: number = endMonth - startMonth + 1;

		// Lọc dữ liệu theo các tháng từ startMonth đến endMonth
		const filteredData = revenueData.slice(startMonth, startMonth + monthsInRange);

		// Lưu dữ liệu đã lọc vào state
		setColumnChartFilteredData(filteredData);

		// Tính tổng revenue trong khoảng thời gian đã chọn
		const total: number = filteredData.reduce((acc, val) => acc + val, 0);
		setTotalRevenue(total);
	};

	useEffect(() => {
		// Gọi hàm lọc mỗi khi selectedDates thay đổi
		filterSubscriptions(selectedDates.start, selectedDates.end);
		filterRevenue(selectedDates.start, selectedDates.end);
	}, [selectedDates]);

	return (
		<AppProvider i18n={enTranslations}>
			<Page fullWidth title="Dashboard">
				<Layout.Section>
					<LegacyCard sectioned>
						<Popover
							active={popoverActive}
							activator={
								<Button onClick={togglePopover} icon="calendar">
									{`${selectedDates.start.toDateString()} - ${selectedDates.end.toDateString()}`}
								</Button>
							}
							onClose={togglePopover}
						>
							<Box padding="400">
								<DatePicker
									month={month}
									year={year}
									onChange={handleDateChange}
									onMonthChange={handleMonthChange}
									selected={selectedDates}
									allowRange
								/>
							</Box>
						</Popover>
						<Space>
							<Button onClick={setYesterday}>Ngày hôm qua</Button>
							<Button onClick={setLast7Days}>7 ngày gần nhất</Button>
							<Button onClick={setLastMonth}>Tháng trước</Button>
							<Button onClick={setThisYear}>Năm nay</Button>
							<Button onClick={resetDates}>Reset</Button>
						</Space>
					</LegacyCard>
				</Layout.Section>

				<Layout.Section>
					<Grid>
						{/* Subscriptions Chart */}
						<Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
							<LegacyCard title="Subscriptions" sectioned>
								<Text variant="bodyMd" as="span">
									Total Subscriptions: {totalSubscriptions}
								</Text>
								<LineChart data={lineData} />
							</LegacyCard>
						</Grid.Cell>

						{/* Revenue Chart */}
						<Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
							<LegacyCard title="Revenue" sectioned>
								<Text variant="bodyMd" as="span">
									Total Revenue: {totalRevenue}
								</Text>
								<ColumnChart data={columnChartData} />
							</LegacyCard>
						</Grid.Cell>
					</Grid>
				</Layout.Section>
			</Page>
		</AppProvider>
	);
}
