import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useState } from 'react';

export default function NewProfileModal({ open, onClose }) {
	const [name, setName] = useState('');

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add Profile</DialogTitle>
			<DialogContent>
				<TextField
					label="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="primary" variant="contained" disableElevation>
					ADD
				</Button>
			</DialogActions>
		</Dialog>
	);
}
