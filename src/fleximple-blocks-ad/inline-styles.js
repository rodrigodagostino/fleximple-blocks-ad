/* global fleximpleblocksPluginData */
const InlineStyles = ({ defaultClassName, attributes: { blockId, attr1, attr2, attr3 } }) => {
	const blockSelector = `.${defaultClassName}[data-block="${blockId}"]`;

	return (
		<style>
			{`${blockSelector} {}`}

			{`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.smallBreakpointValue}px) {}`}

			{`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {}`}

			{`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {}`}
		</style>
	);
};

export default InlineStyles;
