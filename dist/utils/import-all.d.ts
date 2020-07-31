/**
 *
 * @param path path to file directory
 */
export default function importAll(path: any, regex?: RegExp): {
    ext: string;
    path: string;
    name: string;
    originName: string;
    module: any;
}[];
