import { Rules } from 'async-validator';
interface Options {
    target: 'body' | 'query';
    parse: boolean;
    removeKeys: string[];
    selectKeys: string[];
}
export default function CreateValidator(rules: Rules, options: Options): (req: any, res: any, next: any) => void;
export {};
