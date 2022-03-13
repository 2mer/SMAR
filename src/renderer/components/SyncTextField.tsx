import { debounce, TextField } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';

function SyncTextField({ value, onChange, debounceMS = 1000, ...rest }) {
	const [syncValue, setSyncValue] = useState(value);

	const debouncedOnChange = useCallback(debounce(onChange, debounceMS), [
		onChange,
	]);

	const handleChange = (e) => {
		const v = e.target.value;
		debouncedOnChange(v);
		setSyncValue(v);
	};

	useEffect(() => {
		if (value !== syncValue) {
			setSyncValue(value);
		}
	}, [value]);

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <TextField value={syncValue} onChange={handleChange} {...rest} />;
}

export default memo(SyncTextField);
