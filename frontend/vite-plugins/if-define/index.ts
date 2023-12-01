import {Plugin, ResolvedConfig} from 'vite';

let config: ResolvedConfig = undefined!;

function replaceMatched(code: string, id: string) {
    const env = config.env;
    if (DEFAULT_REGEX.test(code)) {
    }
    code = code.replace(
        DEFAULT_REGEX,
        DEFAULT_PARSER(env)
    );
    return {
        code,
        map: null,
    };

}

const DEFAULT_REGEX = /^.*?#v-if(n?)def\s*(\S+).*[\r\n]{1,2}([\s\S]+?)\s*.*?#v-endif.*?$/gm;
const DEFAULT_PARSER = (env) => {
    return (_, $1, $2, $3) => {
//        const isNot = !!$1;
//        const isKeep = $2.split("||").some((v: string) => {
//            let flag = false;
//            const [key, value] = v.split("=");
//            if (value === undefined) {
//                flag = !!env[key];
//            } else {
//                flag = String(env[key]) === value;
//            }
//            flag = isNot ? !flag : flag;
//            return flag;
//        });
        const fn = eval(`(env)=>${$2}`);
        return !!fn(env) ? $3 : "";
    };
};

export const IfDefine = (): Plugin => {

    return {
        name: 'vite-if-define',
        enforce: 'pre',
        configResolved(_config) {
            config = _config;
        },
        transform(code, id) {
            return replaceMatched(code, id);
        },
    };
};
