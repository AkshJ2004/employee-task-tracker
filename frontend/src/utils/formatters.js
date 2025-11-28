export const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString();
};

export const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
