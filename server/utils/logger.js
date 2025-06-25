export const log = (label, data) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[Trailblix | ${timestamp}] ${label}`);
  if (data) console.dir(data, { depth: null, colors: true });
};
