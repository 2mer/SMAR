import { useQuery } from 'react-query';
import { getScript } from '../Service/ScriptsService';
import useProfile from './useProfile';

export default function useScript() {
	const profile = useProfile();

	return useQuery('script', () => getScript(profile.script), {
		enabled: Boolean(profile?.script),
	});
}
