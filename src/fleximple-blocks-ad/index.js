import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

registerBlockType(metadata.name, {
	icon: {
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M17 11.5l1.146-1.146a.501.501 0 01.854.353V20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h9.293a.501.501 0 01.353.854L14.5 5H6v15h11v-8.5zm-7.2 3.3c-.4.1-.7-.2-.6-.6L10 11l9.3-9.3c.4-.4 1-.4 1.4 0l1.6 1.6c.4.4.4 1 0 1.4L13 14l-3.2.8z" />
			</svg>
		),
	},
	edit: Edit,
	save: Save,
});

// Provide a custom block class
function setBlockCustomClassName(className, blockName) {
	return blockName === name ? 'fleximple-blocks-ad' : className;
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-blocks-ad',
	setBlockCustomClassName
);
