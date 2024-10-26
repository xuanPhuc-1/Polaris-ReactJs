import {
	AppProvider,
	Page,
	Text,
	IndexTable,
	Badge,
	Button,
	Pagination,
	useIndexResourceState,
	TextField,
	Select,
	Card,
	Popover
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";
import enTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import type { Product } from "@/api/interface/product";
import AddProductModal from "./AddProductForm";
import AddRuleModal from "./AddRuleForm";
import { Space } from "antd";
import { PlusCircleIcon, SearchIcon } from "@shopify/polaris-icons";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [popoverActive, setPopoverActive] = useState(false);
	const [selectedProductRules, setSelectedProductRules] = useState<number | null>(null);

	// Phân trang
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5); // State cho số item mỗi trang
	const [filterTitle, setFilterTitle] = useState("");
	const [filterStatus, setFilterStatus] = useState("All");
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false);

	const fetchProducts = async () => {
		try {
			const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
			const data = response.data.slice(0, 20);

			const enhancedProducts: Product[] = data.map((product: { id: any; title: any }) => {
				const rules = faker.number.int({ min: 0, max: 10 });
				return {
					id: product.id,
					product: product.title,
					rules,
					lastUpdate: faker.date.recent().toLocaleString(),
					status: rules === 0 ? "No rule" : "Active",
					image: faker.image.url()
				};
			});

			setProducts(enhancedProducts);
			setFilteredProducts(enhancedProducts);
		} catch (error) {
			console.error("Error fetching products", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	// Hàm mở popup để hiển thị rule
	const openPopover = (rules: number | null) => {
		setSelectedProductRules(rules);
		setPopoverActive(true);
	};

	// Hàm lọc sản phẩm
	const filterProducts = useCallback(() => {
		const filtered = products.filter(product => {
			const matchesTitle = product.product.toLowerCase().includes(filterTitle.toLowerCase());
			const matchesStatus = filterStatus === "All" || product.status === filterStatus;
			return matchesTitle && matchesStatus;
		});
		setFilteredProducts(filtered);
		setCurrentPage(1); // Reset trang về 1 mỗi khi lọc
	}, [filterTitle, filterStatus, products]);

	useEffect(() => {
		filterProducts();
	}, [filterTitle, filterStatus, filterProducts]);

	// Tính toán số trang và dữ liệu hiển thị
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	const indexOfLastProduct = currentPage * itemsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	// const [isOpenModal, setIsOpenModal] = useState(false);

	const resourceName = {
		singular: "product",
		plural: "products"
	};

	const handleProductSubmit = (productData: any) => {
		console.log("Product Data:", productData);
		setIsOpenModal(false);
	};

	const handleAddRuleSubmit = (ruleData: any) => {
		console.log("Rule Data:", ruleData);
		setIsAddRuleModalOpen(false);
	};

	const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(products);

	const rowMarkup = currentProducts.map(({ id, product, rules, lastUpdate, status, image }, index) => (
		<IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
			<IndexTable.Cell>
				<div
					style={{
						width: "50px",
						height: "50px",
						overflow: "hidden",
						borderRadius: "5px"
					}}
				>
					<img src={image} alt={product} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
				</div>
			</IndexTable.Cell>
			<IndexTable.Cell>
				<Text variant="bodyMd" fontWeight="bold" as="span">
					{product}
				</Text>
			</IndexTable.Cell>
			<IndexTable.Cell>{rules}</IndexTable.Cell>
			<IndexTable.Cell>{lastUpdate}</IndexTable.Cell>
			<IndexTable.Cell>
				<Badge tone={status === "Active" ? "success" : "critical"}>{status}</Badge>
			</IndexTable.Cell>
			<IndexTable.Cell>
				<Space>
					<Button icon={SearchIcon} onClick={() => openPopover(rules)}>
						Show Rule
					</Button>
					<Button icon={PlusCircleIcon} variant="primary" onClick={() => setIsAddRuleModalOpen(true)}>
						Add Rule
					</Button>
				</Space>
			</IndexTable.Cell>
		</IndexTable.Row>
	));

	return (
		<AppProvider i18n={enTranslations}>
			<Page fullWidth title="Products">
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "20px"
						}}
					>
						<TitleBar title="Products" />
						<Button variant="primary" onClick={() => setIsOpenModal(true)}>
							Generate a product
						</Button>
					</div>
					<div style={{ marginBottom: "20px" }}>
						<TextField
							label="Filter by Title"
							value={filterTitle}
							onChange={value => setFilterTitle(value)}
							placeholder="Enter product title"
							autoComplete="off"
						/>
						<Select
							label="Filter by Status"
							options={["All", "Active", "No rule"]}
							onChange={value => setFilterStatus(value)}
							value={filterStatus}
						/>
					</div>

					<div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
						<Select
							label="Items per Page"
							options={[5, 10, 15, 20].map(number => ({
								label: `${number}`,
								value: number.toString()
							}))}
							onChange={value => {
								setItemsPerPage(Number(value));
								setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số mục hiển thị
							}}
							value={itemsPerPage.toString()}
						/>
						<Select
							label="Select Page"
							options={Array.from({ length: totalPages }, (_, i) => ({
								label: `Page ${i + 1}`,
								value: (i + 1).toString()
							}))}
							onChange={value => setCurrentPage(Number(value))}
							value={currentPage.toString()}
						/>
					</div>

					<div style={{ width: "100%" }}>
						<IndexTable
							resourceName={resourceName}
							itemCount={products.length}
							selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
							onSelectionChange={handleSelectionChange}
							headings={[
								{ title: "Image" },
								{ title: "Title Product" },
								{ title: "Rules" },
								{ title: "Last Update" },
								{ title: "Status" },
								{ title: "Action" }
							]}
						>
							{rowMarkup}
						</IndexTable>

						<Pagination
							hasPrevious={currentPage > 1}
							hasNext={currentPage < totalPages}
							onPrevious={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
							onNext={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
						/>
						{isOpenModal && (
							<AddProductModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSubmit={handleProductSubmit} />
						)}

						{isAddRuleModalOpen && (
							<AddRuleModal
								isOpen={isAddRuleModalOpen}
								onClose={() => setIsAddRuleModalOpen(false)}
								onSubmit={handleAddRuleSubmit}
							/>
						)}
					</div>

					{popoverActive && (
						<Popover active={popoverActive} activator={<Button>Show Rule</Button>} onClose={() => setPopoverActive(false)}>
							<Card>
								<Text as="span">Rule Details: {selectedProductRules}</Text>
							</Card>
						</Popover>
					)}
				</>
			</Page>
		</AppProvider>
	);
}
