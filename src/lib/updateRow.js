/**
 * Appends or updates a new log record to a project log
 */
import { resetSheetDataCache } from './store/cachingDocs.js';
import gapiSeets from './gapi/sheets.js';

const RANGE_NAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function updateRow(spreadsheetId, record, row) {
  if (record.length >= RANGE_NAMES.length) throw new Error('Too many columns');

  const prefix = row !== undefined ? 'A' + (row + 2) : 'A2'; // +2 because we are zero based, and skip headers
  const range = `${prefix}:${RANGE_NAMES[record.length]}`;

  resetSheetDataCache(spreadsheetId);

  const method = row !== undefined ? 'update' : 'append';

  return gapiSeets(`values.${method}`, {
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    values: [record],
  });
}
