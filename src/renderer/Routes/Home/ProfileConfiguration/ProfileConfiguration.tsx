import { Add, AddLink } from '@mui/icons-material';
import { alpha, Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { memo, useState } from 'react';
import DynamicUIComponent from 'renderer/components/DynamicUI/DynamicUIComponent';
import queryClient from 'renderer/queryClient';
import NewProfileModal from '../NewProfileModal/NewProfileModal';
import NewScriptModal from '../NewScriptModal/NewScriptModal';
import useProfile from '../ProfileControls/useProfile';
import useScript from '../ProfileControls/useScript';
import { linkProfileToScript } from '../Service/ScriptsService';
import useSettings from '../Settings/useSettings';

function ProfileConfiguration({ running }) {
	const { isSuccess } = useSettings();

	const [newProfileModalOpen, setNewProfileModalOpen] = useState(false);
	const [newScriptModalOpen, setNewScriptModalOpen] = useState(false);

	const profile = useProfile();

	const { data: script, isSuccess: scriptSuccess, error } = useScript();

	const handleConnectScript = () => {
		linkProfileToScript(profile.id)
			.then(() => {
				queryClient.invalidateQueries('script');
			})
			.catch(alert);
	};

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

	if (!scriptSuccess) {
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
							{error && (
								<Typography color="error">
									{(error as any)?.message}
								</Typography>
							)}
							<Typography>
								Profile has no associated script
							</Typography>
							<Box
								display="flex"
								gap="1rem"
								justifyContent="center"
							>
								<Button
									color="primary"
									variant="contained"
									startIcon={<AddLink />}
									onClick={handleConnectScript}
								>
									CONNECT SCRIPT
								</Button>
								<Button
									color="primary"
									variant="contained"
									startIcon={<Add />}
									onClick={() => setNewScriptModalOpen(true)}
								>
									CREATE SCRIPT
								</Button>
							</Box>
						</Box>
					</Box>
				</Paper>
				<NewScriptModal
					profile={profile}
					open={newScriptModalOpen}
					onClose={() => setNewScriptModalOpen(false)}
				/>
			</>
		);
	}

	const hasParameters = script?.parameters?.length;

	if (!hasParameters) {
		return (
			<Box
				border={`3px dashed ${alpha('#ffffff', 0.2)}`}
				color={alpha('#ffffff', 0.4)}
				display="flex"
				alignItems="center"
				justifyContent="center"
				borderRadius="4px"
				p="1rem"
				style={{
					backdropFilter: 'blur(40px)',
				}}
				flex={1}
			>
				No parameters exposed for tweaking
			</Box>
		);
	}

	return (
		<Box display="flex" flex={1} gap="1rem" flexDirection="column">
			{script?.parameters?.map((p, index) => (
				<DynamicUIComponent
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					parameter={p}
					disabled={running}
				/>
			))}
		</Box>
	);
}

export default memo(ProfileConfiguration);
