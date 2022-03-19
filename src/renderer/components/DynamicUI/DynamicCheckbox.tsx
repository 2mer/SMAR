import { Checkbox, FormControlLabel } from '@mui/material';
import { useMemo } from 'react';
import useProfile, {
	useProfileMutation,
} from 'renderer/Routes/Home/ProfileControls/useProfile';
import getDisplayName from './getDisplayName';

export default function DynamicCheckbox({ parameter: { id }, ...rest }) {
	const displayName = useMemo(() => getDisplayName(id), [id]);

	const profile = useProfile();
	const profileMutation = useProfileMutation();

	return (
		<FormControlLabel
			control={<Checkbox />}
			label={displayName}
			checked={profile?.config?.[id] || false}
			onChange={(e: any) =>
				profileMutation.mutate({
					...profile,
					config: {
						...(profile?.config || {}),
						[id]: e.target.checked,
					},
				})
			}
			{...rest}
		/>
	);
}
