import { useBlockProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

import metadata from './block.json';
import InlineStyles from './inline-styles';

const { name } = metadata;

function AdSave({
	attributes,
	attributes: { blockId, id, type, subtype, url, alt, linkUrl, linkTarget },
}) {
	const defaultClassName = getBlockDefaultClassName(name);

	return (
		<div className={defaultClassName} {...useBlockProps.save()} data-block-id={blockId}>
			<a
				className={`${defaultClassName}__link`}
				href={linkUrl}
				target={linkTarget}
				rel="noopener"
				aria-label={alt}
			></a>
			{Object.entries(type).map(([key, value], index) => {
				if (!value) return null;

				const breakpointKeys = Object.keys(type);
				const breakpointValues = Object.values(type);
				const afterNextBreakpoint = breakpointKeys[index + 2];
				const hasNextBreakpoint = breakpointValues[index + 1];
				const hasAfterNextBreakpoint = breakpointValues[index + 2];
				const hasLargerBreakpoint = Boolean(hasNextBreakpoint || hasAfterNextBreakpoint);

				const getElementClasses = (element) =>
					[
						`${defaultClassName}__${element}`,
						...(hasLargerBreakpoint && hasNextBreakpoint ? [`${key}-only`] : []),
						...(hasLargerBreakpoint && !hasNextBreakpoint && hasAfterNextBreakpoint
							? [`${key}-until-${afterNextBreakpoint}`]
							: []),
						...(!hasLargerBreakpoint ? [`${key}-and-above`] : []),
					].join(' ');

				if (value === 'image') {
					return (
						<picture key={key} className={getElementClasses('picture')}>
							{!!id[key] && (
								<img className={`${defaultClassName}__image`} src={url[key]} alt={alt} />
							)}
						</picture>
					);
				}

				return (
					<video
						key={key}
						className={getElementClasses('video')}
						type={`video/${subtype[key]}`}
						autoPlay
						loop
						muted
					>
						<source src={url[key]} />
					</video>
				);
			})}
			<InlineStyles {...{ defaultClassName, attributes }} />
		</div>
	);
}

export default AdSave;
