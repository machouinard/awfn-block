const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { FormToggle, TextControl, PanelBody, PanelRow } = wp.components;
//import ServerSideRender from '@wordpress/server-side-render';
const { serverSideRender: ServerSideRender } = wp;
import { withState } from '@wordpress/compose';

export default class extends Component {
	constructor( props ) {
		super(...arguments);
		console.log( 'props', this.props );
		this.state = {};
		this.props = props;
	}

	componentWillUnmount() {
		console.log('awfn unmounting');
	}

	render() {
		const { attributes: {icao}, setAttributes } = this.props;
		const { attributes } = this.props;
		//console.log('attributes', attributes );
		return (
			[
				<InspectorControls key="ic-1">
					<PanelBody title={__( 'Options' ) }>
						<TextControl
							label={__( 'ICAO' ) }
							value={ icao }
							onChange={ icao => setAttributes({icao})}
							/>
					</PanelBody>
				</InspectorControls>,
				<ServerSideRender
					key='ssr-1'
					block='awfn/block-awfn'
					attributes={{
						icao: icao
					}}
					/>
			]
		);
	}
}
