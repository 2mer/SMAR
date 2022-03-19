import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Select,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import queryClient from 'renderer/queryClient';
import { createScript } from '../Service/ScriptsService';
import scriptTemplates from '../../../../common/scriptTemplates';

export default function NewScriptModal({
	open,
	onClose,
	profile = undefined as any,
}) {
	const [selectedTemplate, setSelectedTemplate] = useState(
		scriptTemplates[0].id
	);

	const handleCreate = () => {
		// dialog
		// 	.showSaveDialog({
		// 		buttonLabel: 'Save Script',
		// 		defaultPath: 'scripts/script.js',
		// 	})
		// 	.then(({ filePath }) => {
		// 		createScript(filePath, selectedTemplate);
		// 	})
		// 	.catch(alert);
		createScript(profile.id, selectedTemplate)
			.then(() => {
				queryClient.invalidateQueries('script');
				onClose();
			})
			.catch(alert);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Create new script</DialogTitle>
			<DialogContent>
				<Box display="flex" flexDirection="column" gap="1rem" p="1rem">
					<Select
						label="Template"
						value={selectedTemplate}
						onChange={(e) => setSelectedTemplate(e.target.value)}
					>
						{scriptTemplates.map((t) => (
							<MenuItem key={t.id} value={t.id}>
								{t.name}
							</MenuItem>
						))}
					</Select>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>CANCEL</Button>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					onClick={handleCreate}
				>
					CREATE
				</Button>
			</DialogActions>
		</Dialog>
	);
}
