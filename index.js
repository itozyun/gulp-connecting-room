"use strict";

const pluginName = 'gulp-connecting-room',
      through2   = require( 'through2' );

let PluginError, Vinyl;

module.exports = function( variables, fileStem, showLog ){
    const FILES_FROM_HASH = {};

    FILES_FROM_HASH[ '.js' ] = (function(){
        let js = '';

        for( let variableName in variables ){
            const value = variables[ variableName ];

            js += ',\n' + variableName + ' = ' + (
                typeof value === 'string' ? '"' + value + '"' :
                // value && typeof value === 'object' ? JSON.stringify( value ) :
                value
            );
        };
        return 'var ' + js.substr( 2 ) + ';';
    })();

    FILES_FROM_HASH[ '.scss' ] = (function(){
        let scss = '';

        for( let variableName in variables ){
            const value = variables[ variableName ];

            scss += '$' + variableName + ' : ' + (
                typeof value === 'string' && ( 0 <= value.indexOf( '.' ) || !value ) ? '"' + value + '"' :
                // value && typeof value === 'object' ? JSON.stringify( value ) :
                value
            ) + ';\n';
        };
        return scss;
    })();

    return through2.obj(
        function( file, encoding, callback ){
            PluginError = PluginError || require( 'plugin-error' );
            Vinyl       = Vinyl || require( 'vinyl' );

            if( file.isNull() ) return callback();

            if( file.isStream() ){
                this.emit( 'error', new PluginError( pluginName, 'Streaming not supported' ) );
                return callback();
            };
            const extname = file.extname;

            if( FILES_FROM_HASH[ extname ] ){
                this.push( new Vinyl(
                    {
                        path     : file.path.replace( file.stem, fileStem || '__var' ),
                        contents : Buffer.from( FILES_FROM_HASH[ extname ] )
                    }
                ) );
                showLog && console.log( FILES_FROM_HASH[ extname ] );
                delete FILES_FROM_HASH[ extname ];
            };
            this.push( file );
            callback();
        }
    );
};