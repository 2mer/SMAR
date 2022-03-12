import { PushPin, PushPinOutlined } from '@mui/icons-material';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import { ipcRenderer } from 'electron';
import useSettings, { useSettingsMutation } from './useSettings';

export default function Settings() {
	const { data: settings, isSuccess } = useSettings();

	const mutateSettings = useSettingsMutation();

	if (!isSuccess) return null;

	const alwaysOnTop = settings?.config?.alwaysOnTop;

	return (
		<Paper>
			<Box
				p="1rem"
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="100%"
			>
				<Tooltip title={alwaysOnTop ? 'Unpin window' : 'Pin window'}>
					<span>
						<IconButton
							color={alwaysOnTop ? 'primary' : undefined}
							onClick={() => {
								mutateSettings.mutate(
									{
										...(settings || {}),
										config: {
											...(settings.config || {}),
											alwaysOnTop: !alwaysOnTop,
										},
									},
									{
										onSuccess: () => {
											ipcRenderer.send(
												'ALWAYS_ON_TOP_CHANGED',
												!alwaysOnTop
											);
										},
									}
								);
							}}
						>
							{alwaysOnTop ? <PushPin /> : <PushPinOutlined />}
						</IconButton>
					</span>
				</Tooltip>
			</Box>
		</Paper>
	);
}
