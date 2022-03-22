import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import useProfile, {
	useProfileMutation,
} from 'renderer/Routes/Home/ProfileControls/useProfile';
import { Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Add } from '@mui/icons-material';
import getDisplayName from './getDisplayName';
import DynamicDragListItem from './DynamicDragList/DynamicDragListItem';

export default function DynamicDragList({ parameter: { id }, ...rest }) {
	const displayName = useMemo(() => getDisplayName(id), [id]);

	const profile = useProfile();
	const profileMutation = useProfileMutation();
	const value = profile?.config?.[id] || [];
	const parsedValue = value.some((v) => typeof v === 'string') ? [] : value;

	const [addTextValue, setAddTextValue] = useState('');

	const handleAdd = () => {
		profileMutation.mutate({
			...profile,
			config: {
				...(profile?.config || {}),
				[id]: [
					...parsedValue,
					{
						value: addTextValue,
						uuid: uuidv4(),
					},
				],
			},
		});
		setAddTextValue('');
	};

	return (
		<Paper variant="outlined">
			<Box p="1rem" display="flex" gap="1rem" flexDirection="column">
				<Typography>{displayName}</Typography>
				<Droppable droppableId={id}>
					{(provided) => (
						<Box
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{parsedValue.map((v, index) => (
								<DynamicDragListItem
									value={v}
									index={index}
									parameterId={id}
									key={v.uuid}
								/>
							))}
							{provided.placeholder}
						</Box>
					)}
				</Droppable>
				<Box display="flex" gap="1rem" mt="-1rem">
					<TextField
						multiline
						variant="outlined"
						placeholder="New Item"
						value={addTextValue}
						onChange={(e: any) => setAddTextValue(e.target.value)}
						fullWidth
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								handleAdd();
								e.preventDefault();
								e.stopPropagation();
							}
						}}
					/>
					<Button
						startIcon={<Add />}
						variant="outlined"
						onClick={handleAdd}
					>
						Add
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
