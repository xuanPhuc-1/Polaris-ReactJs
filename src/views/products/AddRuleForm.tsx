import React, { useState } from "react";
import { Modal, TextField, Button, FormLayout } from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";

interface Rule {
	buyFrom: string;
	buyTo: string;
	discount: string;
}

interface AddRuleModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
}

const AddRuleModal = ({ isOpen, onClose, onSubmit }: AddRuleModalProps) => {
	const [title, setTitle] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [rules, setRules] = useState<Rule[]>([{ buyFrom: "", buyTo: "", discount: "" }]);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleAddRule = () => {
		setRules([...rules, { buyFrom: "", buyTo: "", discount: "" }]);
	};

	const handleRemoveRule = (index: number) => {
		setRules(rules.filter((_, i) => i !== index));
	};

	const validateFields = () => {
		let newErrors: { [key: string]: string } = {};

		if (!title) newErrors.title = "Title is required";
		if (!startDate) newErrors.startDate = "Start date is required";
		if (!endDate) newErrors.endDate = "End date is required";
		if (endDate && startDate && new Date(endDate) <= new Date(startDate)) {
			newErrors.endDate = "End date must be after Start date";
		}

		rules.forEach((rule, index) => {
			if (!rule.buyFrom || parseFloat(rule.buyFrom) <= 0) {
				newErrors[`buyFrom-${index}`] = "Buy from must be a positive number";
			}
			if (!rule.buyTo || parseFloat(rule.buyTo) <= parseFloat(rule.buyFrom)) {
				newErrors[`buyTo-${index}`] = "Buy to must be greater than Buy from";
			}
			if (!rule.discount || parseFloat(rule.discount) <= 0) {
				newErrors[`discount-${index}`] = "Discount must be a positive percentage";
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = () => {
		if (validateFields()) {
			const data = {
				title,
				startDate,
				endDate,
				rules
			};
			console.log("Form Submitted:", data);
			onSubmit(data);
			onClose();
		}
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			title="Add rule"
			primaryAction={{
				content: "Save",
				onAction: handleSave
			}}
			secondaryActions={[
				{
					content: "Cancel",
					onAction: onClose
				}
			]}
		>
			<Modal.Section>
				<FormLayout>
					<FormLayout.Group condensed>
						<TextField
							label="Title campaign"
							value={title}
							onChange={value => setTitle(value)}
							autoComplete="off"
							error={errors.title}
							// Set width
						/>
					</FormLayout.Group>
					<FormLayout.Group>
						<TextField
							label="Start date"
							type="date"
							value={startDate}
							onChange={value => setStartDate(value)}
							autoComplete="off"
							error={errors.startDate}
						/>
						<TextField
							label="End date"
							type="date"
							value={endDate}
							onChange={value => setEndDate(value)}
							autoComplete="off"
							error={errors.endDate}
							// Set width
						/>
					</FormLayout.Group>

					{rules.map((rule, index) => (
						<FormLayout.Group condensed key={index}>
							<TextField
								label="Buy from"
								type="number"
								value={rule.buyFrom}
								onChange={value => {
									const newRules = [...rules];
									newRules[index].buyFrom = value;
									setRules(newRules);
								}}
								autoComplete="off"
								error={errors[`buyFrom-${index}`]}
							/>
							<TextField
								label="Buy to"
								type="number"
								value={rule.buyTo}
								onChange={value => {
									const newRules = [...rules];
									newRules[index].buyTo = value;
									setRules(newRules);
								}}
								autoComplete="off"
								error={errors[`buyTo-${index}`]}
							/>
							<TextField
								label="Discount per item(%)"
								type="number"
								value={rule.discount}
								onChange={value => {
									const newRules = [...rules];
									newRules[index].discount = value;
									setRules(newRules);
								}}
								autoComplete="off"
								error={errors[`discount-${index}`]}
							/>
							<div style={{ display: "flex", alignItems: "center", marginTop: "1.6rem" }}>
								<Button
									icon={DeleteIcon}
									accessibilityLabel="Remove rule"
									onClick={() => handleRemoveRule(index)}
									variant="plain"
									tone="critical"
								/>
							</div>
						</FormLayout.Group>
					))}

					<div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "10px" }}>
						<Button onClick={handleAddRule}>+ Add</Button>
					</div>
				</FormLayout>
			</Modal.Section>
		</Modal>
	);
};

export default AddRuleModal;