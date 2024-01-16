import {format} from 'date-fns';

export const getHumanDateFormat = (timestamp: number): string => {
    let date = new Date(timestamp * 1000);
    return format(date, 'dd.MM.yyyy | HH:mm:ss');
}