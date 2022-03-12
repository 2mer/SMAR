import { ipcRenderer } from 'electron';
import { useCallback, useEffect } from 'react';

export default function useIPC(name, handler, changeArray = [] as any[]) {
	const callback = useCallback(handler, changeArray);

	useEffect(() => {
		ipcRenderer.on(name, callback);

		return () => {
			ipcRenderer.removeListener(name, callback);
		};
	}, [name, callback]);
}
