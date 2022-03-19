import { executionIPC } from './ExecutionIPC';
import { scriptsIPC } from './ScriptsIPC';
import { settingsIPC } from './SettingsIPC';
import { versionIPC } from './VersionIPC';

export function setupIPC() {
	settingsIPC();
	executionIPC();
	scriptsIPC();
	versionIPC();
}
