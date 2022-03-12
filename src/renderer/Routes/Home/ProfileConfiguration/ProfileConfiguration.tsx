import {
	Add,
	AllInclusive,
	Code,
	Numbers,
	Send,
	Stop,
} from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Divider,
	IconButton,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import useIPC from 'renderer/hooks/useIPC';
import { abortScript, startScript } from '../Controls/ExecutionService';
import NewProfileModal from '../NewProfileModal/NewProfileModal';
import useProfile, { useProfileMutation } from '../ProfileControls/useProfile';
import useSettings from '../Settings/useSettings';

export default function ProfileConfiguration() {
	const { isSuccess, data: settings } = useSettings();

	const [progress, setProgress] = useState(null as any);
	const [running, setRunning] = useState(false);
	const [newProfileModalOpen, setNewProfileModalOpen] = useState(false);

	const profile = useProfile();
	const profileMutation = useProfileMutation();

	const handleStartClicked = (p) => {
		if (!running) {
			setRunning(true);
			startScript(p?.config)
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

	useIPC('SCRIPT_PROGRESS_CHANGED', (e, data) => {
		setProgress(data);
	});

	useIPC(
		'SCRIPT_TOGGLE_HOTKEY_PRESSED',
		(event, hotkey) => {
			console.log('hey', hotkey);
			const foundProfile = settings?.profiles?.find(
				(p) => p.hotkey === hotkey
			);

			if (foundProfile) {
				handleStartClicked(foundProfile);
			}
		},
		[handleStartClicked]
	);

	const { step, maxSteps } = progress || {};

	const endlessMode = maxSteps === -1;

	if (!isSuccess) return null;
	if (!profile)
		return (
			<>
				<Paper>
					<Box
						p="1rem"
						display="flex"
						gap="1rem"
						justifyContent="center"
					>
						<Box
							display="flex"
							alignItems="center"
							flexDirection="column"
							gap="1rem"
						>
							<Typography>
								You do not have any profiles
							</Typography>
							<Button
								color="primary"
								variant="contained"
								startIcon={<Add />}
								onClick={() => setNewProfileModalOpen(true)}
							>
								CREATE A NEW PROFILE
							</Button>
						</Box>
					</Box>
				</Paper>
				<NewProfileModal
					open={newProfileModalOpen}
					onClose={() => setNewProfileModalOpen(false)}
				/>
			</>
		);

	return (
		<Paper>
			<Box
				p="1rem"
				display="flex"
				gap="1rem"
				justifyContent="space-between"
			>
				<Box display="flex" gap="1rem">
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
						value={profile?.config?.amount || ''}
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
						value={profile?.config?.messageInterval || ''}
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
						value={profile?.config?.startDelay || ''}
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
				<Tooltip title="Exec mode">
					<span>
						<IconButton
							color={
								profile?.config?.execMode
									? 'primary'
									: undefined
							}
							onClick={() => {
								profileMutation.mutate({
									...profile,
									config: {
										...(profile?.config || {}),
										execMode: !profile?.config?.execMode,
									},
								});
							}}
						>
							<Code />
						</IconButton>
					</span>
				</Tooltip>
			</Box>

			{/* messaging actions */}
			<Divider />
			<Box p="1rem" display="flex" gap="1rem">
				<TextField
					multiline
					fullWidth
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
									<Typography>
										{maxSteps - step || '...'}
									</Typography>
								)}
							</Box>
						</Box>
					)}
					<Button
						variant="contained"
						disableElevation
						color={running ? 'error' : 'primary'}
						sx={{ height: '100%' }}
						onClick={() => handleStartClicked(profile)}
					>
						{running ? <Stop /> : <Send />}
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
