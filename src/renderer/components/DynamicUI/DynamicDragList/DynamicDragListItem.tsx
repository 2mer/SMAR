import { Clear, DragIndicator } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import SyncTextField from 'renderer/components/SyncTextField';
import useProfile, {
	useProfileMutation,
} from 'renderer/Routes/Home/ProfileControls/useProfile';

export default function DynamicDragListItem({ value, index, parameterId }) {
	const profile = useProfile();
	const profileMutation = useProfileMutation();

	return (
		<Draggable index={index} draggableId={value.uuid}>
			{(provided) => (
				<Paper
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					sx={{ mb: '1rem' }}
				>
					<Box display="flex" p="1rem">
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							pr="1rem"
						>
							<DragIndicator />
						</Box>
						<SyncTextField
							multiline
							fullWidth
							value={value.value}
							onChange={(v) => {
								const oldVals =
									[...profile?.config?.[parameterId]] || [];

								oldVals[index] = {
									...oldVals[index],
									value: v || '',
								};

								return profileMutation.mutate({
									...profile,
									config: {
										...(profile?.config || {}),
										[parameterId]: oldVals,
									},
								});
							}}
						/>
						<Box
							ml="1rem"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<IconButton
								onClick={() => {
									const oldVals =
										[...profile?.config?.[parameterId]] ||
										[];

									const newVals = oldVals.filter(
										(_, i) => i !== index
									);

									return profileMutation.mutate({
										...profile,
										config: {
											...(profile?.config || {}),
											[parameterId]: newVals,
										},
									});
								}}
							>
								<Clear />
							</IconButton>
						</Box>
					</Box>
				</Paper>
			)}
		</Draggable>
	);
}
