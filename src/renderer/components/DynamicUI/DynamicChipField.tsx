import { Autocomplete, TextField } from '@mui/material';
import { useMemo } from 'react';
import useProfile, {
	useProfileMutation,
} from 'renderer/Routes/Home/ProfileControls/useProfile';
import getDisplayName from './getDisplayName';

export default function DynamicChipField({ parameter: { id }, ...rest }) {
	const displayName = useMemo(() => getDisplayName(id), [id]);

	const profile = useProfile();
	const profileMutation = useProfileMutation();

	return (
		<Autocomplete
			value={profile?.config?.[id] || []}
			options={[]}
			multiple
			freeSolo
			onChange={(e, newVals) =>
				profileMutation.mutate({
					...profile,
					config: {
						...(profile?.config || {}),
						[id]: newVals,
					},
				})
			}
			renderInput={(params) => (
				<TextField {...params} label={displayName} variant="outlined" />
			)}
			ChipProps={{
				style: {
					height: 'unset',
					borderRadius: '6px',
					minHeight: '32px',
				},
				sx: {
					span: { whiteSpace: 'break-spaces' },
				},
			}}
			{...rest}
		/>
	);
}
