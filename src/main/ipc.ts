import { executionIPC } from './Services/ExecutionIPC';
import { profileIPC } from './Services/ProfileIPC';
import { settingsIPC } from './Services/SettingsIPC';

export function setupIPC() {
	settingsIPC();
	profileIPC();
	executionIPC();
}
