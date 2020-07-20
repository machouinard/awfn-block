const { Component }                          = wp.element;
const { __ }                                 = wp.i18n;
const { InspectorControls }                  = wp.editor;
const {
	      ToggleControl,
	      RangeControl,
	      TextControl,
	      PanelBody,
	      PanelRow
      }                                      = wp.components;
//import ServerSideRender from '@wordpress/server-side-render';
const { serverSideRender: ServerSideRender } = wp;
import { withState } from '@wordpress/compose';

export default class extends Component {
	constructor( props ) {
		super( ...arguments );
		console.log( 'props', this.props );
		this.state = {};
		this.props = props;
	}

	componentWillUnmount() {
		console.log( 'awfn unmounting' );
	}

	render() {
		const { attributes: { icao, showMetar, showTaf, showPireps, radialDist }, setAttributes } = this.props;

		const onIcaoChange = icao => {
			// Limit ICAO to 3 characters
			if ( 4 < icao.length ) {
				icao = icao.substr( 0, 4 );
			}
			//console.log('new icao', icao);
			setAttributes( { icao } );
		};
		const onDistChange = dist => {
			console.log( 'dist', dist );
			setAttributes( { radialDist: dist } );
		};
		return (
			[
				<InspectorControls key="ic-1">
					<PanelBody title={ __( 'Wx Options' ) }>
						<PanelRow>
							<TextControl
								label={ __( 'ICAO' ) }
								value={ icao }
								onChange={ onIcaoChange }
								max={ 4 }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show METAR' ) }
								checked={ showMetar }
								onChange={ () => setAttributes( { showMetar: !showMetar } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show TAF' ) }
								checked={ showTaf }
								onChange={ () => setAttributes( { showTaf: !showTaf } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show PIREPS' ) }
								checked={ showPireps }
								onChange={ () => setAttributes( { showPireps: !showPireps } ) }
							/>
						</PanelRow>
						<PanelRow>
							<RangeControl
								label="Radial Distance"
								value={ radialDist }
								onChange={ onDistChange }
								min={ 50 }
								max={ 300 }
								step={ 25 }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
				<ServerSideRender
					key='ssr-1'
					block='awfn/block-awfn'
					attributes={ {
						icao,
						showMetar,
						showTaf,
						showPireps,
						radialDist
					} }
				/>
			]
		);
	}
}
