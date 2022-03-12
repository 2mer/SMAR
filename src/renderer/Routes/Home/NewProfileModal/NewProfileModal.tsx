import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useSettings, { useSettingsMutation } from '../Settings/useSettings';

export default function NewProfileModal({
	open,
	onClose,
	addMode = false,
	profile = undefined as any,
}) {
	const [name, setName] = useState('');
	const [hotkey, setHotkey] = useState('');
	const { data: settings = {} } = useSettings();
	const mutateSettings = useSettingsMutation();

	useEffect(() => {
		if (!addMode) {
			setName(profile?.name);
			setHotkey(profile?.hotkey);
		} else {
			setName('');
			setHotkey('');
		}
	}, [addMode, profile]);

	const handleAdd = () => {
		const newProfile = { name, id: uuidv4(), hotkey };
		mutateSettings.mutate(
			{
				...settings,
				profiles: [...(settings.profiles || []), newProfile],
			},
			{
				onSuccess: () => ipcRenderer.send('SHORTCUT_CHANGED'),
			}
		);
		onClose();
	};

	const handleEdit = () => {
		const newProfile = { ...profile, name, hotkey };
		mutateSettings.mutate(
			{
				...settings,
				profiles: (settings.profiles || []).map((p) =>
					p.id === profile?.id ? newProfile : p
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
			<DialogTitle>
				{addMode ? 'Add Profile' : 'Edit Profile'}
			</DialogTitle>
			<DialogContent>
				<Box display="flex" flexDirection="column" gap="1rem" p="1rem">
					<TextField
						label="profile name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						label="hotkey"
						value={hotkey}
						onChange={(e) => setHotkey(e.target.value)}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>CANCEL</Button>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					onClick={addMode ? handleAdd : handleEdit}
				>
					{addMode ? 'ADD' : 'SAVE'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
