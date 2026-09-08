export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const formatPhoneInternational = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return `+88${cleaned}`;
  }
  return `+${cleaned}`;
};
