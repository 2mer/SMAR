import { useQuery } from 'react-query';
import { getVersion } from '../Service/VersionService';

export default function useVersion() {
	return useQuery('version', getVersion);
}
