import { Edit, FileOpen, InsertDriveFile } from '@mui/icons-material';
import { alpha, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';
import queryClient from 'renderer/queryClient';
import ExecutionControls from '../ExecutionControls/ExecutionControls';
import useProfile from '../ProfileControls/useProfile';
import { editScript, linkProfileToScript } from '../Service/ScriptsService';

export default function ScriptControls({ running, setRunning }) {
	const profile = useProfile();

	const hasScript = Boolean(profile?.script);

	const scriptName = useMemo(() => {
		return profile?.script?.split(/\/|\\/g).pop();
	}, [profile?.script]);

	const handleConnectScript = () => {
		linkProfileToScript(profile.id)
			.then(() => {
				queryClient.invalidateQueries(['script', profile.id]);
			})
			.catch(alert);
	};

	const handleEdit = () => {
		editScript(profile?.script)
			.then(() => {
				queryClient.invalidateQueries(['script', profile.id]);
			})
			.catch(alert);
	};

	return (
		<Box display="flex" flexDirection="column">
			<Box
				p="1rem"
				flex={1}
				display="flex"
				justifyContent="space-between"
			>
				<Box display="flex" gap="4px">
					<Tooltip title={profile?.script || ''}>
						<Box
							display="flex"
							gap="8px"
							bgcolor={alpha('#ffffff', 0.05)}
							alignItems="center"
							borderRadius="4px"
							p="4px"
						>
							<InsertDriveFile />
							<Typography
								style={{
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									width: '200px',

									/* Beginning of string */
									direction: 'rtl',
									textAlign: 'left',
								}}
								color={hasScript ? 'primary' : 'error'}
							>
								{hasScript ? scriptName : 'No linked script'}
							</Typography>
						</Box>
					</Tooltip>
					<Box display="flex">
						<Tooltip title="Edit Script">
							<span>
								<IconButton onClick={handleEdit}>
									<Edit />
								</IconButton>
							</span>
						</Tooltip>
						<Tooltip title="Change Script">
							<span>
								<IconButton
									disabled={!hasScript}
									onClick={handleConnectScript}
								>
									<FileOpen />
								</IconButton>
							</span>
						</Tooltip>
					</Box>
				</Box>
				<ExecutionControls running={running} setRunning={setRunning} />
			</Box>
		</Box>
	);
}
