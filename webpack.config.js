//Add the path module to use 
const path = require('path');
//add webpack for bundling
const webpack = require('webpack');
//add Some additional library the is going to be used by webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//This module is used to extract css

//Export Module for use
module.exports = {
    // mode : 'devlopment',
    //This is to configure the server for webpack-server
    devServer : {
        contentBase : path.resolve(__dirname,'demo'), //This is to find the path where to start serving from
        compress : true,        //Compress the files
        publicPath : "demo", //folder that app is being served from
        writeToDisk : true  //saving temporarily wrtitng to 
    },
    //This is to specify the entry of the app
    entry :  './src/js/app.js',

    //This is Where the webpack is going to be outputting its result after bundling
    output: {
        filename : 'app.js',
        path : path.resolve(__dirname,'demo/js'),
        publicPath : '/demo'
    },
    //configure the rules that would be followed by webpack
    //And also how to bundle our files and dependencies
    module : {
        rules : [
            {
                test : /\.(scss)$/,
                use : [
                    {
                        loader : MiniCssExtractPlugin.loader
                    },
                    //Loading the css
                    {
                        loader : 'css-loader'
                    },
                    //Loading the postCss
                    {
                        loader : 'postcss-loader',
                        options : { 
                            plugins : function(){
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    //loading sass
                    {
                        loader : 'sass-loader'
                    }

                ]
            },
            //Testing for webFonts (loading fonts from webpack)
            {
                test : /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use : [
                    {
                        loader : 'file-loader',
                        options : {
                            name : '[name].[ext]',
                            outputPath : '../fonts/',
                            publicPath : '../fonts/'
                        }
                    }
                ]
            }
        ]

    },
    //Adding the plugin used in webpack
    plugins : [
        new MiniCssExtractPlugin({
            filename : '../css/app.css'
        }),
        new webpack.ProvidePlugin({
            $ : 'jquery',
            jQuery : 'jquery'
        })
    ]
}
