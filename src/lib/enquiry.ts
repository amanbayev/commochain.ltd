export type Enquiry = { name: string; email: string; organisation: string; project: string };
type Labels = Pick<Enquiry, 'name' | 'email' | 'organisation' | 'project'>;

export function formatEnquiry(values: Enquiry, labels: Labels) {
  return `${labels.name}: ${values.name.trim()}\n${labels.email}: ${values.email.trim()}\n${labels.organisation}: ${values.organisation.trim()}\n\n${labels.project}:\n${values.project.trim()}`;
}

export function enquiryMailto(recipient: string, subject: string, body: string) {
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
