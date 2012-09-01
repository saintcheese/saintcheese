var applet = {
	handle: null,
	
	callback: function( destination, success, params ) {
		console.log( 'callback to ' + destination );
		if( destination == 'ready' ) {
			applet.handle = $( '#app-main' )[ 0 ];
			$( '#input-connect-psychic' ).removeAttr( 'disabled' );
			$( '#submit-connect-connect' ).removeAttr( 'disabled' );
		} else if( destination == 'connected' ) {
			if( success ) {
				var membersonly = params[ 0 ];
				$( '#guests-allowed' ).html( 'guests ' + ( ( membersonly == false ) ? 'allowed' : 'disallowed' ) );
				$( '#input-connect-session' ).removeAttr( 'disabled' );
				$( '#input-chat' ).removeAttr( 'disabled' );
				$( '#input-count' ).removeAttr( 'disabled' );
				$( '#submit-chat' ).removeAttr( 'disabled' );
				if( $( '#psychic-control' ).hasClass( 'error' ) ) {
					$( '#psychic-control' ).removeClass( 'error' );
				}
			} else {
				$( '#input-connect-psychic' ).removeAttr( 'disabled' );
				$( '#submit-connect-connect' ).removeAttr( 'disabled' );
				$( '#psychic-control' ).addClass( 'error' );
			}
		} else if( destination == 'chatSent' ) {
			$( '#input-chat' ).val( '' );
			$( '#input-connect-session' ).removeAttr( 'disabled' );
			$( '#input-chat' ).removeAttr( 'disabled' );
			$( '#input-count' ).removeAttr( 'disabled' );
			$( '#submit-chat' ).removeAttr( 'disabled' );
		}
	}
}

var minMem = 32;
var maxMem = 1024;
$( document ).ready( function( ) {
	$( '#form-connect' ).submit( function( e ) {
		e.preventDefault( );
		
		$( '#input-connect-psychic' ).attr( 'disabled', '' );
		$( '#submit-connect-connect' ).attr( 'disabled', '' );
		
		var psychic = $( '#input-connect-psychic' ).val( );
		
		applet.handle.call( 'connect', 'oranum', 'connect', [ psychic ] );
	} );
	
	$( '#form-cont' ).submit( function( e ) {
		e.preventDefault( );
		
		$( '#input-connect-session' ).attr( 'disabled', '' );
		$( '#input-chat' ).attr( 'disabled', '' );
		$( '#input-count' ).attr( 'disabled', '' );
		$( '#submit-chat' ).attr( 'disabled', '' );
		
		var message = $( '#input-chat' ).val( );
		var count = $( '#input-count' ).val( );
		var session = $( '#input-connect-session' ).val( );
		applet.handle.call( 'cont', 'oranum', 'cont', [ session, message, count ] );
	} );
	
	$( '#form-chat' ).submit( function( e ) {
		e.preventDefault( );
		
		$( '#input-connect-session' ).attr( 'disabled', '' );
		$( '#input-chat' ).attr( 'disabled', '' );
		$( '#input-count' ).attr( 'disabled', '' );
		$( '#submit-chat' ).attr( 'disabled', '' );
		
		var message = $( '#input-chat' ).val( );
		var count = $( '#input-count' ).val( );
		var session = $( '#input-connect-session' ).val( );
		console.log( 'sending message: ' + message );
		applet.handle.call( 'sendchat', 'oranum', 'sendchat', [ session, message, count ] );
	} );
	
	$.get( 'assets/app/main.jnlp.template', function( data ) {
		var jnlp = $.base64.encode( data.format( minMem, maxMem ) );
		dtjava.addOnloadCallback( function( ) {
			dtjava.embed( {
				url: 'assets/app/main.jnlp.template',
				jnlp_content: jnlp,
				id: 'app-main',
				width: 1,
				height: 1,
				placeholder: 'app-main-container'
			}, {
				javafx: '2.2+',
				jvm: '1.7+',
				jvmargs: '-Xms{0}m -Xmx{1}m -XX:-UseSplitVerifier'.format( minMem, maxMem )
			}, {
				onGetSplash: function( app ) { return null; }
			} );
		} );
	} );
} );