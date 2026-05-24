import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import icon from './icon';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

registerBlockType(metadata.name, {
	icon: {
		src: icon,
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
