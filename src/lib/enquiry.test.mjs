import assert from 'node:assert/strict';
import { test } from 'node:test';
import { enquiryMailto, formatEnquiry } from './enquiry.ts';

test('formats a reviewable enquiry without changing Unicode or project line breaks', () => {
  const values = { name: '  Әлия  ', email: ' person@example.com ', organisation: '  Grain & Co ', project: '  Поле\nNext season  ' };
  const labels = { name: 'Name', email: 'Email', organisation: 'Company', project: 'Project' };
  assert.equal(formatEnquiry(values, labels), 'Name: Әлия\nEmail: person@example.com\nCompany: Grain & Co\n\nProject:\nПоле\nNext season');
});

test('encodes all visitor content inside the mail body, never as extra recipients', () => {
  const body = 'Өнім & grain?\n&bcc=unwanted@example.com#fragment';
  const subject = 'Project & partnership';
  const result = new URL(enquiryMailto('info@commochain.ltd', subject, body));
  assert.equal(result.pathname, 'info@commochain.ltd');
  assert.equal(result.searchParams.get('subject'), subject);
  assert.equal(result.searchParams.get('body'), body);
  assert.deepEqual([...result.searchParams.keys()], ['subject', 'body']);
  assert.equal(result.hash, '');
});
