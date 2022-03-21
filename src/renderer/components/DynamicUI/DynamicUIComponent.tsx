/* eslint-disable react/jsx-props-no-spreading */
import { Box, Divider, Paper, Typography } from '@mui/material';
import DynamicCheckbox from './DynamicCheckbox';
import DynamicChipField from './DynamicChipField';
import DynamicTextfield from './DynamicTextfield';
import getDisplayName from './getDisplayName';

export default function DynamicUIComponent({
	parameter,
	direction: prevDirection = undefined as any,
	...rest
}) {
	const isArray = Array.isArray(parameter);

	if (isArray) {
		const [meta, ...items] = parameter;
		const [name, direction] = meta.split(':');

		let render = (
			<Box display="flex" flexDirection={direction} gap="1rem">
				{items.map((item, index) => (
					<DynamicUIComponent
						// eslint-disable-next-line react/no-array-index-key
						key={index}
						parameter={item}
						direction={direction}
					/>
				))}
			</Box>
		);

		if (name) {
			const displayName = getDisplayName(name);

			render = (
				<>
					<Box
						p="1rem"
						display="flex"
						flexDirection="column"
						gap="1rem"
					>
						<Typography style={{ textTransform: 'capitalize' }}>
							{displayName}
						</Typography>
						{render}
					</Box>
				</>
			);
		}

		if (prevDirection) {
			render = (
				<Paper variant="outlined" sx={{ p: '1rem' }}>
					{render}
				</Paper>
			);
		} else {
			render = (
				<>
					<Divider />
					{render}
				</>
			);
		}

		return render;
	}

	const { type } = parameter;

	switch (type) {
		case 'number':
			return (
				<DynamicTextfield
					type="number"
					parameter={parameter}
					{...rest}
				/>
			);
		case 'text':
			return <DynamicTextfield parameter={parameter} {...rest} />;
		case 'array':
			return <DynamicChipField parameter={parameter} {...rest} />;
		case 'boolean':
			return <DynamicCheckbox parameter={parameter} {...rest} />;
		default:
			return (
				<Box color="error.main">
					No handle for type &apos;{type}&apos;
				</Box>
			);
	}
}
