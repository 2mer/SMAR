import {
	AllInclusive,
	Message,
	Numbers,
	Send,
	Stop,
} from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Divider,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import useIPC from 'renderer/hooks/useIPC';
import { abortScript, startScript } from '../Controls/ExecutionService';
import useProfile, { useProfileMutation } from '../ProfileControls/useProfile';
import useSettings from '../Settings/useSettings';

export default function ProfileConfiguration() {
	const { data: settings, isSuccess } = useSettings();

	const [progress, setProgress] = useState(null as any);
	const [running, setRunning] = useState(false);

	const profile = useProfile();
	const profileMutation = useProfileMutation();

	const handleStartClicked = () => {
		if (!running) {
			setRunning(true);
			startScript(profile?.config)
				.then(() => {
					setRunning(false);
				})
				.catch((err) => {
					alert(err);
				});
		} else {
			abortScript();
			setRunning(false);
		}
	};

	useIPC('SCRIPT_PROGRESS_CHANGED', (e, data) => {
		setProgress(data);
	});

	const { step, maxSteps } = progress || {};

	const endlessMode = maxSteps === -1;

	if (!isSuccess) return null;

	return (
		<Paper>
			<Box p="1rem" display="flex" gap="1rem">
				<TextField
					InputProps={{
						startAdornment: (
							<Tooltip title="Amount">
								<Numbers />
							</Tooltip>
						),
					}}
					label="Amount"
					size="small"
					disabled={running}
					value={profile?.config?.amount}
					onChange={(e) =>
						profileMutation.mutate({
							...profile,
							config: {
								...(profile?.config || {}),
								amount: e.target.value,
							},
						})
					}
				/>
				<TextField
					size="small"
					label="Message Interval"
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
					value={profile?.config?.messageInterval}
					onChange={(e) =>
						profileMutation.mutate({
							...profile,
							config: {
								...(profile?.config || {}),
								messageInterval: e.target.value,
							},
						})
					}
				/>
				<TextField
					size="small"
					label="Start Delay"
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
					value={profile?.config?.startDelay}
					onChange={(e) =>
						profileMutation.mutate({
							...profile,
							config: {
								...(profile?.config || {}),
								startDelay: e.target.value,
							},
						})
					}
				/>
			</Box>

			{/* messaging actions */}
			<Divider />
			<Box p="1rem" display="flex" gap="1rem">
				<TextField
					fullWidth
					InputProps={{
						startAdornment: (
							<Tooltip title="Message">
								<Message />
							</Tooltip>
						),
					}}
					disabled={running}
					label="Message"
					value={profile?.config?.message || ''}
					onChange={(e) =>
						profileMutation.mutate({
							...profile,
							config: {
								...(profile?.config || {}),
								message: e.target.value,
							},
						})
					}
				/>
				<Box
					display="flex"
					alignItems="center"
					gap="1rem"
					minWidth="200px"
					justifyContent="flex-end"
				>
					{running && (
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							position="relative"
							height="100%"
						>
							<CircularProgress
								variant={
									endlessMode
										? 'indeterminate'
										: 'determinate'
								}
								color="primary"
								value={(maxSteps - step) / maxSteps}
							/>
							<Box
								position="absolute"
								top="0"
								left="0"
								width="100%"
								height="100%"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								{endlessMode ? (
									<AllInclusive />
								) : (
									<Typography>{maxSteps - step}</Typography>
								)}
							</Box>
						</Box>
					)}
					<Button
						variant="contained"
						disableElevation
						color={running ? 'error' : 'primary'}
						sx={{ height: '100%' }}
						onClick={handleStartClicked}
					>
						{running ? <Stop /> : <Send />}
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
