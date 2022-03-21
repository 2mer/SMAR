import { Cached, MenuBook } from '@mui/icons-material';
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import { useMutation } from 'react-query';
import { checkForUpdates } from '../Service/VersionService';
import useVersion from './useVersion';

export default function Stats() {
	const { data: version, isSuccess } = useVersion();
	const mutation = useMutation(checkForUpdates);

	if (!isSuccess) {
		return null;
	}

	return (
		<Box display="flex" gap="1rem">
			<Box display="flex" gap="8px" alignItems="center">
				<Link
					target="_blank"
					href="https://github.com/LeRedditBro/SMAR/wiki"
				>
					Wiki
				</Link>
				<IconButton
					size="small"
					href="https://github.com/LeRedditBro/SMAR/wiki"
					target="_blank"
				>
					<MenuBook />
				</IconButton>
			</Box>
			<Box display="flex" gap="8px" alignItems="center">
				<Link
					href={`https://github.com/LeRedditBro/SMAR/releases/tag/v${version}`}
					target="_blank"
				>
					{version}
				</Link>
				<Tooltip title="Check for updates">
					<span>
						<IconButton
							disabled={mutation.isLoading}
							size="small"
							onClick={() => mutation.mutate()}
						>
							<Cached />
						</IconButton>
					</span>
				</Tooltip>
			</Box>
		</Box>
	);
}
