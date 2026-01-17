const {withNativeWind: withNativeWind} = require('nativewind/metro')

// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config')
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)
config.resolver.sourceExts.push('sql')

const configWithNativeWind = withNativeWind(config, {input: './global.css'})

module.exports = wrapWithReanimatedMetroConfig(configWithNativeWind)
