import { LOCALES } from '../constants';
import englishMessages from './en/form.json';
import japaneseMessages from './jp/form.json';

const localeMessages = {
    [LOCALES.ENGLISH]: englishMessages,
    [LOCALES.JAPANESE]:japaneseMessages,
}

export default localeMessages;