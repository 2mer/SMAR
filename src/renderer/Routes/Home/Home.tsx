import { Box, Grid, Paper, Typography } from '@mui/material';
import Settings from './Settings/Settings';

function Home() {
	return (
		<Box p="1rem" display="flex" flexDirection="column">
			<Box p="2rem 0 4rem">
				<Box display="flex" gap="1rem" alignItems="center">
					<Box mr="-20px">
						<Typography variant="h2" color="primary">
							S.M.A.R
						</Typography>
						<Box
							display="grid"
							gridTemplateColumns="repeat(4, 60px)"
							ml="2px"
							color="test.secondary"
						>
							<span>Spam</span>
							<span>Me</span>
							<span>A</span>
							<span>River</span>
						</Box>
					</Box>
					<Typography variant="h2">🌊</Typography>
				</Box>
			</Box>
			<Paper sx={{ p: '1rem ' }}>
				<Settings />
			</Paper>
		</Box>
	);
}

export default Home;
