import { getBlockDefaultClassName } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';
import InlineStyles from './inline-styles';

const { name } = metadata;

function AdSave({ attributes, attributes: { blockId, attr1, attr2, attr3 } }) {
	const defaultClassName = getBlockDefaultClassName(name);

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps} data-block-id={blockId}>
			<InnerBlocks.Content />
			<InlineStyles {...{ defaultClassName, attributes }} />
		</div>
	);
}

export default AdSave;
