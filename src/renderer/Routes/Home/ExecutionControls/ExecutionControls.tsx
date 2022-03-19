import { PlayArrow, Stop } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import useIPC from 'renderer/hooks/useIPC';
import { abortScript, startScript } from '../Controls/ExecutionService';
import useProfile from '../ProfileControls/useProfile';
import useSettings from '../Settings/useSettings';

export default function ExecutionControls({ running, setRunning }) {
	const { data: settings } = useSettings();
	const profile = useProfile();

	const handleStartClicked = (p) => {
		if (!running) {
			setRunning(true);
			startScript(p?.script, p?.config)
				.then(() => {
					setRunning(false);
				})
				.catch((err) => {
					alert(err);
					setRunning(false);
				});
		} else {
			abortScript();
			setRunning(false);
		}
	};

	useIPC(
		'SCRIPT_TOGGLE_HOTKEY_PRESSED',
		(event, hotkey) => {
			const foundProfile = settings?.profiles?.find(
				(p) => p.hotkey === hotkey
			);

			if (foundProfile) {
				handleStartClicked(foundProfile);
			}
		},
		[handleStartClicked]
	);

	return (
		<Box display="flex" alignItems="center" gap="1rem" minWidth="200px">
			<Button
				variant="contained"
				disableElevation
				color={running ? 'error' : 'primary'}
				sx={{ height: '100%', flex: 1 }}
				onClick={() => handleStartClicked(profile)}
				startIcon={running ? <Stop /> : <PlayArrow />}
				disabled={!profile?.script}
			>
				{running ? 'ABORT SCRIPT' : 'RUN SCRIPT'}
			</Button>

			{running && (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					position="relative"
					height="100%"
				>
					<CircularProgress variant="indeterminate" color="primary" />
				</Box>
			)}
		</Box>
	);
}
