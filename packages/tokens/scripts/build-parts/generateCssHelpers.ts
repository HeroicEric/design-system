import fs from 'fs-extra';

import { Dictionary, Platform }  from 'style-dictionary';

import { generateElevationHelpers } from './generateElevationHelpers';
import { generateTypographyHelpers } from './generateTypographyHelpers';

export const PREFIX = 'hds';

export async function generateCssHelpers(dictionary: Dictionary, config: Platform ): Promise<void> {

    fs.ensureDir(`${config.buildPath}/helpers/`);

    // tried to use style-dictionary/lib/common/formatHelpers/fileHeader.js but didn't work
    const header = `/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n`;

    if (dictionary.tokens.typography) {
        const helpers = generateTypographyHelpers(dictionary.tokens.typography);
        const content = `${header}\n${helpers.join('\n')}\n`;
        await fs.writeFile(`${config.buildPath}/helpers/typography.css`, content);
    }

    if (dictionary.tokens.elevation) {
        const helpers = generateElevationHelpers(dictionary.tokens.elevation);
        const content = `${header}\n${helpers.join('\n')}\n`;
        await fs.writeFile(`${config.buildPath}/helpers/elevation.css`, content);
    }
}
