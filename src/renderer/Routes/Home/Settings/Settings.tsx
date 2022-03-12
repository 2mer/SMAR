import { PushPin, PushPinOutlined } from '@mui/icons-material';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import useSettings, { useSettingsMutation } from './useSettings';

export default function Settings() {
	const { data: settings, isSuccess } = useSettings();

	const mutateSettings = useSettingsMutation();

	if (!isSuccess) return null;

	const alwaysOnTop = settings?.config?.alwaysOnTop;

	return (
		<Paper>
			<Box p="1rem">
				<Tooltip title={alwaysOnTop ? 'Unpin window' : 'Pin window'}>
					<span>
						<IconButton
							color={alwaysOnTop ? 'primary' : undefined}
							onClick={() => {
								mutateSettings.mutate({
									...(settings || {}),
									config: {
										...(settings.config || {}),
										alwaysOnTop: !alwaysOnTop,
									},
								});
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
