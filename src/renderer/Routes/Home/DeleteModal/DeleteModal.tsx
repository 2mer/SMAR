import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import { ipcRenderer } from 'electron';
import useSettings, { useSettingsMutation } from '../Settings/useSettings';

export default function DeleteModal({
	open,
	onClose,
	profile = undefined as any,
}) {
	const { data: settings = {} } = useSettings();
	const mutateSettings = useSettingsMutation();

	const handleDelete = () => {
		mutateSettings.mutate(
			{
				...settings,
				profiles: (settings.profiles || []).filter(
					(p) => p.id !== profile.id
				),
			},
			{
				onSuccess: () => ipcRenderer.send('SHORTCUT_CHANGED'),
			}
		);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Delete Profile</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this profile?
				<Paper>
					<Box p="1rem">{profile.name}</Box>
				</Paper>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>CANCEL</Button>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					onClick={handleDelete}
				>
					DELETE
				</Button>
			</DialogActions>
		</Dialog>
	);
}
