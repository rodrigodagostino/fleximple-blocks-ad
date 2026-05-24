import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

import metadata from './block.json';
import './editor.scss';
import InlineStyles from './inline-styles';

const { name } = metadata;

const INNER_BLOCKS_TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			/* translators: content placeholder */
			placeholder: __('Write a title…', 'fleximple-blocks-ad'),
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __('Write some content…', 'fleximple-blocks-ad'),
		},
	],
];

export default function AdEdit({
	attributes,
	attributes: { blockId, attr1, attr2, attr3 },
	setAttributes,
	clientId,
}) {
	useEffect(() => {
		setAttributes({ blockId: clientId });
	}, [clientId]);

	const defaultClassName = getBlockDefaultClassName(name);

	const blockProps = useBlockProps();

	return (
		<div {...blockProps} data-block-id={blockId}>
			<InnerBlocks template={INNER_BLOCKS_TEMPLATE} />
			<InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
		</div>
	);
}
