import { IRentalsDefault } from '../../utils/interfaces/rentalsInterfaces';

const rentalsDefault: IRentalsDefault = {
    description: 'List of website keywords available for web scraping',
    availableWebsites: [
        'argenprop',
        'mercado-libre',
        'remax',
        'zonaprop',
        'inmoclick',
    ],
};

// eslint-disable-next-line import/prefer-default-export
export { rentalsDefault };
