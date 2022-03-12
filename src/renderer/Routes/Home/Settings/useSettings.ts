import { useMutation, useQuery, useQueryClient } from 'react-query';
import { readSettings, saveSettings } from './SettingsService';

export default function useSettings(options = {}) {
	return useQuery('settings', readSettings, options);
}

export function useSettingsMutation(options = {}) {
	const queryClient = useQueryClient();

	return useMutation(saveSettings, {
		onSuccess: () => {
			queryClient.invalidateQueries('settings');
		},
		...options,
	});
}
