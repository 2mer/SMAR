import {
	Add,
	AllInclusive,
	Message,
	Numbers,
	PushPin,
	PushPinOutlined,
	Send,
	Stop,
} from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Divider,
	IconButton,
	Paper,
	Select,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSettingsContext } from './SettingsContext';

export default function Settings() {
	const settings = useSettingsContext();

	const alwaysOnTop = settings?.config?.alwaysOnTop;
	const selectedProfile = settings?.selectedProfile;

	const running = true;
	const progress = -1;

	return (
		<Box display="flex" flexDirection="column" gap="2rem">
			<Box display="flex" gap="2rem">
				{/* Profile configuration */}
				<Paper sx={{ flex: 1 }}>
					<Box
						p="1rem"
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Select size="small" />
						<Button
							color="primary"
							variant="outlined"
							startIcon={<Add />}
						>
							NEW PROFILE
						</Button>
					</Box>
				</Paper>
				{/* User preferences */}
				<Paper>
					<Box p="1rem">
						<Tooltip
							title={alwaysOnTop ? 'Unpin window' : 'Pin window'}
						>
							<span>
								<IconButton
									color={alwaysOnTop ? 'primary' : undefined}
								>
									{alwaysOnTop ? (
										<PushPin />
									) : (
										<PushPinOutlined />
									)}
								</IconButton>
							</span>
						</Tooltip>
					</Box>
				</Paper>
			</Box>

			{/* Message + execution controls */}
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
					/>
					<TextField
						size="small"
						label="Message Interval"
						inputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',
						}}
					/>
					<TextField
						size="small"
						label="Start Delay"
						inputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',
						}}
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
										progress === -1
											? 'indeterminate'
											: 'determinate'
									}
									color="primary"
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
									{progress === -1 ? (
										<AllInclusive />
									) : (
										<Typography>{progress}</Typography>
									)}
								</Box>
							</Box>
						)}
						<Button
							variant="contained"
							disableElevation
							color={running ? 'error' : 'primary'}
							sx={{ height: '100%' }}
						>
							{running ? <Stop /> : <Send />}
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}
