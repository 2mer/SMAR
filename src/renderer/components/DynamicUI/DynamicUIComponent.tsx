/* eslint-disable react/jsx-props-no-spreading */
import { Box, Paper, Typography } from '@mui/material';
import DynamicCheckbox from './DynamicCheckbox';
import DynamicChipField from './DynamicChipField';
import DynamicTextfield from './DynamicTextfield';
import getDisplayName from './getDisplayName';

export default function DynamicUIComponent({ parameter, ...rest }) {
	const isArray = Array.isArray(parameter);

	if (isArray) {
		const [meta, ...items] = parameter;
		const [name, direction] = meta.split(':');

		const render = (
			<Box display="flex" flexDirection={direction} gap="1rem">
				{items.map((item, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<DynamicUIComponent key={index} parameter={item} />
				))}
			</Box>
		);

		if (name) {
			const displayName = getDisplayName(name);

			return (
				<Paper>
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
				</Paper>
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
