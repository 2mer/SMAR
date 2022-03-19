import { useMemo } from 'react';
import useProfile, {
	useProfileMutation,
} from 'renderer/Routes/Home/ProfileControls/useProfile';
import SyncTextField from '../SyncTextField';
import getDisplayName from './getDisplayName';

export default function DynamicTextfield({ parameter: { id }, ...rest }) {
	const displayName = useMemo(() => getDisplayName(id), [id]);

	const profile = useProfile();
	const profileMutation = useProfileMutation();

	return (
		<SyncTextField
			label={displayName}
			fullWidth
			size="small"
			value={profile?.config?.[id] || ''}
			onChange={(value) =>
				profileMutation.mutate({
					...profile,
					config: {
						...(profile?.config || {}),
						[id]: value,
					},
				})
			}
			{...rest}
		/>
	);
}
