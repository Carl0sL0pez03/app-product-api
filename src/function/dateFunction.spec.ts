import { dateFunctionSave } from './dateFunction';

describe('dateFunctionSave', () => {
  it('should subtract 5 hours from the given date', () => {
    const inputDate = new Date('2023-01-01T12:00:00Z');
    const expectedDate = new Date('2023-01-01T07:00:00Z');

    const result = dateFunctionSave(inputDate);
    expect(result).toEqual(expectedDate);
  });

  it('should handle string inputs and subtract 5 hours', () => {
    const inputDate = '2023-01-01T12:00:00Z';
    const expectedDate = new Date('2023-01-01T07:00:00Z');

    const result = dateFunctionSave(inputDate);
    expect(result).toEqual(expectedDate);
  });

  it('should use the current date and time if no date is provided and subtract 5 hours', () => {
    const now = new Date();
    const expectedDate = new Date(now);
    expectedDate.setHours(now.getHours() - 5);

    const result = dateFunctionSave();
    expect(result).toEqual(expectedDate);
  });
});
