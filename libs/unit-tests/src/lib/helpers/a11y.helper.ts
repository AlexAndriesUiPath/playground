import { axe } from 'jest-axe';

export const itShouldBeWCAGCompliance = async (nativeElement: Element) => {
  expect(await axe(nativeElement)).toHaveNoViolations();
};
