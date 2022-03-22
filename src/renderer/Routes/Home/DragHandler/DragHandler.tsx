import { DragDropContext } from 'react-beautiful-dnd';
import useProfile, { useProfileMutation } from '../ProfileControls/useProfile';

export default function DragHandler({ children }) {
	const profile = useProfile();
	const profileMutation = useProfileMutation();

	const handleDragEnd = ({ destination, source, draggableId }) => {
		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const fromParam = source?.droppableId;
		const toParam = destination?.droppableId;

		const itemValue = (profile?.config?.[fromParam] || []).find(
			(i) => i.uuid === draggableId
		);

		const fromItems = (profile?.config?.[fromParam] || []).filter(
			(i) => i.uuid !== draggableId
		);

		const toItems = (profile?.config?.[toParam] || []).filter(
			(i) => i.uuid !== draggableId
		);

		toItems.splice(destination.index, 0, itemValue);

		const newConfig = {
			...(profile?.config || {}),
			[fromParam]: fromItems,
		};

		newConfig[toParam] = toItems;

		profileMutation.mutate({
			...profile,
			config: newConfig,
		});
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
	);
}
