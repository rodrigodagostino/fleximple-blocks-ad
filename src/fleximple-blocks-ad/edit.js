import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	Placeholder,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

import metadata from './block.json';
import icon from './icon';
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel';
import { setResponsiveAttribute } from '../utils';
import './editor.scss';
import InlineStyles from './inline-styles';

const { name } = metadata;

const ALLOWED_MEDIA_TYPES = ['image', 'video'];

export default function AdEdit({
	attributes,
	attributes: { blockId, id, type, subtype, url, size, width, alt, linkUrl, linkTarget, linkLabel },
	setAttributes,
	clientId,
}) {
	const instanceId = useInstanceId(AdEdit);

	const [mediaData, setMediaData] = useState();

	useEffect(() => {
		if (id.small !== null || id.medium !== null || id.large !== null) {
			fetchMediaData();
		}
	}, []);

	useEffect(() => {
		setAttributes({ blockId: clientId });
	}, [clientId]);

	const fetchMediaData = async () => {
		const mediaIds = Object.entries(id);
		await Promise.all(
			mediaIds.map((mediaId) => {
				const [key, value] = mediaId;
				if (!value) {
					return { [key]: null };
				}
				return apiFetch({
					path: `/wp/v2/media/${value}`,
				}).then((response) => {
					return {
						[key]: {
							id: response.id,
							...(response.media_type === 'image' && { sizes: response.media_details.sizes }),
							type: response.media_type,
							subtype: response.mime_type.split('/')[1],
							alt: response.alt_text,
						},
					};
				});
			})
		).then((responses) => {
			setMediaData({
				...responses['0'],
				...responses['1'],
				...responses['2'],
			});
		});
	};

	const defaultClassName = getBlockDefaultClassName(name);

	const blockProps = useBlockProps();

	function MediaPlaceholder() {
		return (
			<>
				{!id.small && !id.medium && !id.large && (
					<Placeholder
						icon={icon}
						label={__('Ad', 'fleximple-blocks-ad')}
						className="fleximple-components-placeholder"
						instructions={__('Select a media element to start with.', 'fleximple-blocks-ad')}
					>
						<MediaUpload
							id={`fleximple-blocks-container-media-control-${instanceId}`}
							onSelect={(media) => {
								setResponsiveAttribute(attributes, setAttributes, 'id', 'small', media.id);
								setResponsiveAttribute(attributes, setAttributes, 'type', 'small', media.type);
								setResponsiveAttribute(
									attributes,
									setAttributes,
									'subtype',
									'small',
									media.subtype
								);
								setResponsiveAttribute(
									attributes,
									setAttributes,
									'url',
									'small',
									media.sizes[size.small].url
								);
								setAttributes({ alt: media.alt });
							}}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							value={id}
							render={({ open }) => (
								<>
									<Button
										className="button button-large is-button is-primary width-full"
										style={{ marginTop: '10px' }}
										onClick={open}
									>
										{!id.small
											? __('Choose media', 'fleximple-blocks-ad')
											: __('Replace media', 'fleximple-blocks-ad')}
									</Button>
								</>
							)}
						/>
					</Placeholder>
				)}
			</>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Main', 'fleximple-blocks-ad')}>
					<>
						<ResponsiveSettingsTabPanel initialTabName="small">
							{(tab) => (
								<>
									<BaseControl
										label={__('Media', 'fleximple-blocks-ad')}
										id={`fleximple-blocks-container-media-control-${instanceId}`}
									>
										<MediaUploadCheck>
											<MediaUpload
												id={`fleximple-blocks-container-media-control-${instanceId}`}
												onSelect={(media) => {
													setResponsiveAttribute(
														attributes,
														setAttributes,
														'id',
														tab.name,
														media.id
													);
													setResponsiveAttribute(
														attributes,
														setAttributes,
														'type',
														tab.name,
														media.type
													);
													setResponsiveAttribute(
														attributes,
														setAttributes,
														'subtype',
														tab.name,
														media.subtype
													);
													const mediaUrl =
														media.type === 'image' ? media.sizes[size[tab.name]].url : media.url;
													setResponsiveAttribute(
														attributes,
														setAttributes,
														'url',
														tab.name,
														mediaUrl
													);
													setAttributes({ alt: media.alt });
													setMediaData({
														...mediaData,
														[tab.name]: media,
													});
												}}
												allowedTypes={ALLOWED_MEDIA_TYPES}
												value={id[tab.name]}
												render={({ open }) => (
													<>
														{!!id[tab.name] && (
															<Button className="button button-media width-full" onClick={open}>
																{type[tab.name] === 'image' && (
																	<img
																		src={url[tab.name]}
																		style={{ verticalAlign: 'middle' }}
																		alt={__('Replace media', 'fleximple-blocks-ad')}
																	/>
																)}
																{type[tab.name] === 'video' && (
																	<video
																		src={url[tab.name]}
																		type={`video/${subtype[tab.name]}`}
																		autoPlay
																		loop
																		muted
																		style={{ verticalAlign: 'middle' }}
																	/>
																)}
															</Button>
														)}

														<Button
															className="button button-large is-button is-default is-large width-full"
															style={{ marginTop: '10px' }}
															onClick={open}
														>
															{!id[tab.name]
																? __('Choose media', 'fleximple-blocks-ad')
																: __('Replace media', 'fleximple-blocks-ad')}
														</Button>

														{!!id[tab.name] && (
															<Button
																className="button button-link-delete width-full is-button is-large"
																style={{ marginTop: '10px' }}
																isDestructive
																onClick={() => {
																	setResponsiveAttribute(
																		attributes,
																		setAttributes,
																		'id',
																		tab.name,
																		null
																	);
																	setResponsiveAttribute(
																		attributes,
																		setAttributes,
																		'type',
																		tab.name,
																		null
																	);
																	setResponsiveAttribute(
																		attributes,
																		setAttributes,
																		'subtype',
																		tab.name,
																		null
																	);
																	setResponsiveAttribute(
																		attributes,
																		setAttributes,
																		'url',
																		tab.name,
																		null
																	);
																	setMediaData({
																		...mediaData,
																		[tab.name]: null,
																	});
																}}
															>
																{__('Remove media', 'fleximple-blocks-ad')}
															</Button>
														)}
													</>
												)}
											/>
										</MediaUploadCheck>
									</BaseControl>

									{!!id[tab.name] && mediaData && (
										<SelectControl
											label={__('Width', 'fleximple-blocks-ad')}
											value={width[tab.name]}
											options={[
												{
													label: __('Auto', 'fleximple-blocks-ad'),
													value: 'auto',
												},
												{
													label: __('Full', 'fleximple-blocks-ad'),
													value: 'full',
												},
											]}
											onChange={(value) => {
												setResponsiveAttribute(attributes, setAttributes, 'width', tab.name, value);
											}}
										/>
									)}

									{!!id[tab.name] && mediaData && type[tab.name] === 'image' && (
										<SelectControl
											label={__('Size', 'fleximple-blocks-ad')}
											value={size[tab.name]}
											options={[
												{
													label: __('None', 'fleximple-blocks-ad'),
													value: 'none',
												},
												...Object.keys(mediaData[tab.name].sizes).map((mediaSize) => {
													const label = mediaSize
														.replace(/_/g, ' ')
														.replace(/(?:^|\s)\S/g, function (a) {
															return a.toUpperCase();
														});
													return {
														label,
														value: mediaSize,
													};
												}),
											]}
											onChange={(value) => {
												setResponsiveAttribute(attributes, setAttributes, 'size', tab.name, value);
												setResponsiveAttribute(
													attributes,
													setAttributes,
													'url',
													tab.name,
													mediaData[tab.name].sizes[value].source_url ||
														mediaData[tab.name].sizes[value].url
												);
											}}
										/>
									)}
								</>
							)}
						</ResponsiveSettingsTabPanel>

						<TextControl
							label={__('Link URL', 'fleximple-blocks-ad')}
							value={linkUrl}
							placeholder={__('Type the link URL…', 'fleximple-blocks-ad')}
							onChange={(value) => setAttributes({ linkUrl: value })}
						/>

						<SelectControl
							label={__('Link target', 'fleximple-blocks-ad')}
							value={linkTarget}
							options={[
								{
									label: __('Open in current tab', 'fleximple-blocks-ad'),
									value: '_self',
								},
								{
									label: __('Open in new tab', 'fleximple-blocks-ad'),
									value: '_blank',
								},
							]}
							onChange={(value) => setAttributes({ linkTarget: value })}
							disabled={!linkUrl}
						/>

						<TextControl
							label={__('Link label', 'fleximple-blocks-ad')}
							value={linkLabel}
							placeholder={__('Type the link label…', 'fleximple-blocks-ad')}
							onChange={(value) => setAttributes({ linkLabel: value })}
						/>
					</>
				</PanelBody>
			</InspectorControls>

			<div className={defaultClassName} {...blockProps} data-block-id={blockId}>
				<MediaPlaceholder />
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
		</>
	);
}
