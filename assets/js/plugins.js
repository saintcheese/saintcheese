// Avoid `console` errors in browsers that lack a console.
if( !( window.console && console.log ) ) {
	( function( ) {
        var noop = function( ) { };
        var methods = [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn' ];
        var length = methods.length;
        var console = window.console = { };
        while( length-- ) {
            console[ methods[ length ] ] = noop;
        }
    }( ) );
}

String.prototype.format = function( ) {
  var args = arguments;
  return this.replace( /{(\d+)}/g, function( match, number ) { 
    return typeof args[ number ] != 'undefined'
      ? args[ number ]
      : match
    ;
  } );
};