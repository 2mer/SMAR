import { Add, Delete, Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	IconButton,
	ListItemText,
	MenuItem,
	Paper,
	Select,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal';
import NewProfileModal from '../NewProfileModal/NewProfileModal';
import useSettings, { useSettingsMutation } from '../Settings/useSettings';
import useProfile from './useProfile';

export default function ProfileControls() {
	const { data: settings, isSuccess } = useSettings();
	const profiles = settings?.profiles || [];
	const selectedProfile = useProfile();
	const settingsMutation = useSettingsMutation();

	const [newProfileModalOpen, setNewProfileModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [addMode, setAddMode] = useState(false);

	const handleSelectProfile = (pId) => {
		settingsMutation.mutate({ ...settings, selectedProfile: pId });
	};

	if (!isSuccess) return null;

	return (
		<>
			<Paper sx={{ flex: 1 }}>
				<Box
					p="1rem"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box display="flex" alignItems="center" gap="8px">
						{/* profile select */}
						<Select
							size="small"
							style={{
								width: '300px',
								display: 'flex',
								alignItems: 'center',
							}}
							value={selectedProfile?.id || ''}
							onChange={(e) =>
								handleSelectProfile(e.target.value)
							}
						>
							{profiles.map((p) => (
								<MenuItem key={p.id} value={p.id}>
									<ListItemText>{p.name}</ListItemText>
									<Typography color="textSecondary">
										{p.hotkey}
									</Typography>
								</MenuItem>
							))}
						</Select>

						<Tooltip title="Edit profile">
							<span>
								<IconButton
									disabled={!selectedProfile}
									onClick={() => {
										setNewProfileModalOpen(true);
										setAddMode(false);
									}}
								>
									<Edit />
								</IconButton>
							</span>
						</Tooltip>

						<Tooltip title="Delete profile">
							<span>
								<IconButton
									disabled={!selectedProfile}
									onClick={() => {
										setDeleteModalOpen(true);
									}}
								>
									<Delete />
								</IconButton>
							</span>
						</Tooltip>
					</Box>

					{/* add profile */}
					<Button
						color="primary"
						variant="outlined"
						startIcon={<Add />}
						onClick={() => {
							setNewProfileModalOpen(true);
							setAddMode(true);
						}}
					>
						NEW PROFILE
					</Button>
				</Box>
			</Paper>

			{/* modals */}
			<NewProfileModal
				open={newProfileModalOpen}
				onClose={() => setNewProfileModalOpen(false)}
				addMode={addMode}
				profile={selectedProfile}
			/>

			<DeleteModal
				profile={selectedProfile}
				open={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
			/>
		</>
	);
}
