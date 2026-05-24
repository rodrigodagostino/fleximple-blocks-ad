export const setResponsiveAttribute = (attributes, setAttributes, attribute, targets, values) => {
	const newAttribute = { ...attributes[attribute] };
	if (typeof targets === 'string') {
		newAttribute[targets] = values;
	} else {
		targets.forEach((target, i) => {
			newAttribute[target] = values[i];
		});
	}
	setAttributes({ [attribute]: newAttribute });
};
