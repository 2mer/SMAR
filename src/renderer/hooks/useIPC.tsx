import { ipcRenderer } from 'electron';
import { useEffect } from 'react';

export default function useIPC(name, handler) {
	useEffect(() => {
		ipcRenderer.on(name, handler);

		return () => {
			ipcRenderer.removeListener(name, handler);
		};
	}, [name]);
}
