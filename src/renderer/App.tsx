import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppContent from './AppContent';
import queryClient from './queryClient';
import Home from './Routes/Home/Home';
import darkTheme from './Theme';

export default function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline>
				<QueryClientProvider client={queryClient}>
					<AppContent>
						<Router>
							<Routes>
								<Route path="/" element={<Home />} />
							</Routes>
						</Router>
					</AppContent>
				</QueryClientProvider>
			</CssBaseline>
		</ThemeProvider>
	);
}
