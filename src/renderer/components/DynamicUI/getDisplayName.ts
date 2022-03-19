export default function getDisplayName(id) {
	const result = id.replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ');
	return result.charAt(0).toUpperCase() + result.slice(1);
}
