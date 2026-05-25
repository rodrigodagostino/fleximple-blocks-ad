/* global fleximpleblocksPluginData */
const InlineStyles = ({ defaultClassName, attributes: { blockId, width } }) => {
	const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`;

	return (
		<style>
			{`${blockSelector} .${defaultClassName}__picture, ${blockSelector} .${defaultClassName}__image, ${blockSelector} .${defaultClassName}__video {
        width: ${width.small === 'full' ? '100%' : 'auto'};
      }`}

			{`@media (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
				${blockSelector} .${defaultClassName}__picture, ${blockSelector} .${defaultClassName}__image, ${blockSelector} .${defaultClassName}__video {
					width: ${width.medium === 'full' ? '100%' : 'auto'};
				}
			}`}

			{`@media (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
				${blockSelector} .${defaultClassName}__picture, ${blockSelector} .${defaultClassName}__image, ${blockSelector} .${defaultClassName}__video {
					width: ${width.large === 'full' ? '100%' : 'auto'};
				}
			}`}

			{`.small-only, .medium-only, .small-and-above, .medium-and-above, .large-and-above { display: none }`}

			{`@media (max-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue - 1}px) {
				.small-only { display: flex }
			}`}

			{`@media (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) and (max-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue - 1}px) {
				.medium-only { display: flex }
			}`}

			{`.small-and-above { display: flex }`}

			{`@media (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
				.medium-and-above { display: flex }
			}`}

			{`@media (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
				.large-and-above { display: flex }
			}`}
		</style>
	);
};

export default InlineStyles;
