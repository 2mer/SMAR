import { useMutation, useQueryClient } from 'react-query';
import { saveSettings } from '../Service/SettingsService';
import useSettings from '../Settings/useSettings';

export default function useProfile() {
	const { data: settings, isSuccess } = useSettings();

	if (!isSuccess) return null;

	return (
		settings?.profiles?.find((p) => p.id === settings?.selectedProfile) ||
		settings?.profiles?.[0]
	);
}

export function useProfileMutation(options = {}) {
	const { data: settings } = useSettings();
	const profile = useProfile();
	const queryClient = useQueryClient();

	return useMutation(
		(payload) => {
			return saveSettings({
				...(settings || {}),
				profiles: (settings?.profiles || [])
					.map((p) => (p.id === profile.id ? payload : p))
					.filter(Boolean),
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('settings');
			},
			...options,
		}
	);
}
