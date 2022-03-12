import { executionIPC } from './Services/ExecutionIPC';
import { settingsIPC } from './Services/SettingsIPC';

export function setupIPC() {
	settingsIPC();
	executionIPC();
}
