import SmallComponents from "../components/SmallComponents/SmallComponents";
import gfgIcon from '../assets/images/gfg_icon.png'
import leetcodeIcon from '../assets/images/leetcode_icon_2.png'

export const BASE_URL = 'https://rich-elk-top-coat.cyclic.app/api';
// export const BASE_URL = 'http://localhost:5000/api';
export const CHROME_EXTENSION_URL = 'https://drive.google.com/file/d/1UERkMa91Mh36wHaAa0peeM6OvbljAn5n/view?usp=drivesdk'
export const LOCAL_STORAGE_KEY = 'coderecordUserData';
export const LEETCODE = 'leetcode';
export const GFG = 'gfg';
export const OPERATION_MAPPING = {
    SEARCH: 1,
    SORT: 2,
    FILTER: 3,
}

export const smallComponents = {
    DATE: 'DATE',
    EMPTY_SCREEN: 'EMPTY_SCREEN',
    NO_RESULT_FOUND: 'NO_RESULT_FOUND',
    PLATFORM_ICON: 'PLATFORM_ICON',
}
export const PLATFORMS = {
    LEETCODE: 'LEETCODE',
    GFG: 'GFG',
}
export const PLATFORM_ICONS = {
    LEETCODE: leetcodeIcon,
    GFG: gfgIcon,
}
export const URLS = {
    LEETCODE: 'https://leetcode.com/problems/',
    GFG: 'https://practice.geeksforgeeks.org/',
}
