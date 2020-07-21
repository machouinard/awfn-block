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
const { serverSideRender: ServerSideRender } = wp;

export default class extends Component {
	constructor( props ) {
		super( ...arguments );
		//console.log( 'props', this.props );
		this.state = {};
		this.props = props;
	}

	componentWillUnmount() {
		console.log( 'awfn unmounting' );
	}

	isEditing = () => {
		this.props.setAttributes( { editing: true } );
	};

	render() {
		const { attributes: { icao, showMetar, showTaf, showPireps, radialDist, hoursBeforeNow, editing }, setAttributes } = this.props;

		const onIcaoChange  = icao => {
			this.isEditing();
			// Limit ICAO to 4 characters
			if ( 4 < icao.length ) {
				icao = icao.substr( 0, 4 );
			}
			setAttributes( { icao } );
		};
		const onDistChange  = dist => {
			this.isEditing();
			console.log( 'dist', dist );
			setAttributes( { radialDist: dist } );
		};
		const onHoursChange = hours => {
			this.isEditing();
			setAttributes( { hoursBeforeNow: hours } );
		};
		return (
			[
				<InspectorControls key="ic-1">
					<PanelBody title={ __( 'Wx Options' ) }>
						<PanelRow>
							<ToggleControl
								label={ __( 'Editing' ) }
								checked={ editing }
								onChange={ () => setAttributes( { editing: !editing } ) }
							/>
						</PanelRow>
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
								onChange={ () => {
									this.isEditing();
									setAttributes( { showMetar: !showMetar } );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show TAF' ) }
								checked={ showTaf }
								onChange={ () => {
									this.isEditing();
									setAttributes( { showTaf: !showTaf } );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show PIREPS' ) }
								checked={ showPireps }
								onChange={ () => {
									this.isEditing();
									setAttributes( { showPireps: !showPireps } );
								} }
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
						<PanelRow>
							<RangeControl
								label="Hours before now"
								value={ hoursBeforeNow }
								onChange={ onHoursChange }
								min={ 1 }
								max={ 6 }
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
						radialDist,
						hoursBeforeNow,
						editing
					} }
				/>
			]
		);
	}
}
