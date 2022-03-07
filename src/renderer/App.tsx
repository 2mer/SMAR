import { CssBaseline, ThemeProvider } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home/Home';
import ProfileProvider from './Routes/Home/Profile/ProfileProvider';
import SettingsProvider from './Routes/Home/Settings/SettingsProvider';
import darkTheme from './Theme';

export default function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline>
				<SettingsProvider>
					<ProfileProvider>
						<Router>
							<Routes>
								<Route path="/" element={<Home />} />
							</Routes>
						</Router>
					</ProfileProvider>
				</SettingsProvider>
			</CssBaseline>
		</ThemeProvider>
	);
}
