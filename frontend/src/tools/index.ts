import {tool as rssSubscribor} from './rss-subscribor';
import {tool as httpStatusCodes} from './http-status-codes';
import {tool as gitMemo} from './git-memo';
import {tool as reQrcode} from './reqrcode-parser';
import type {ToolCategory} from './tools.types';

export const toolsByCategory: ToolCategory[] = [
    {
        name: 'journey',
        components: [
            rssSubscribor
        ]
    },
    {
        name: 'Crypto',
        components: [
            // tokenGenerator, hashText, bcrypt, uuidGenerator, ulidGenerator, cypher, bip39, hmacGenerator, rsaKeyPairGenerator, passwordStrengthAnalyser, pdfSignatureChecker
        ],
    },
    {
        name: 'Converter',
        components: [
            // dateTimeConverter,
            // baseConverter,
            // romanNumeralConverter,
            // base64StringConverter,
            // base64FileConverter,
            // colorConverter,
            // caseConverter,
            // textToNatoAlphabet,
            // textToBinary,
            // yamlToJson,
            // yamlToToml,
            // jsonToYaml,
            // jsonToToml,
            // listConverter,
            // tomlToJson,
            // tomlToYaml,
        ],
    },
    {
        name: 'Web',
        components: [
            // urlEncoder,
            // htmlEntities,
            // urlParser,
            // deviceInformation,
            // basicAuthGenerator,
            // metaTagGenerator,
            // otpCodeGeneratorAndValidator,
            // mimeTypes,
            // jwtParser,
            // keycodeInfo,
            // slugifyString,
            // htmlWysiwygEditor,
            // userAgentParser,
            httpStatusCodes,
            // jsonDiff,
        ],
    },
    {
        name: 'Images and videos',
        components: [
            // qrCodeGenerator,
            // wifiQrCodeGenerator,
            // svgPlaceholderGenerator,
            // cameraRecorder,
            reQrcode
        ],
    },
    {
        name: 'Development',
        components: [
            gitMemo,
            // randomPortGenerator,
            // crontabGenerator,
            // jsonViewer,
            // jsonMinify,
            // jsonToCsv,
            // sqlPrettify,
            // chmodCalculator,
            // dockerRunToDockerComposeConverter,
            // xmlFormatter,
        ],
    },
    // {
    //     name: 'Network',
    //     components: [ipv4SubnetCalculator, ipv4AddressConverter, ipv4RangeExpander, macAddressLookup, macAddressGenerator, ipv6UlaGenerator],
    // },
    // {
    //     name: 'Math',
    //     components: [mathEvaluator, etaCalculator, percentageCalculator],
    // },
    // {
    //     name: 'Measurement',
    //     components: [chronometer, temperatureConverter, benchmarkBuilder],
    // },
    // {
    //     name: 'Text',
    //     components: [loremIpsumGenerator, textStatistics, emojiPicker, stringObfuscator, textDiff, numeronymGenerator],
    // },
    // {
    //     name: 'Data',
    //     components: [phoneParserAndFormatter, ibanValidatorAndParser],
    // },
];

export const tools = toolsByCategory.flatMap(({components}) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({components, name}) =>
    components.map(tool => ({category: name, ...tool})),
);
