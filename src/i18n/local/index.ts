// Website wording in English and French. Each file in src/content/text/ holds one
// section of the site with an "en" and an "fr" version of every line
// (editable in Pages CMS and at /admin: "Wording (English and French)").
const modules = import.meta.glob('../../content/text/*.json', { eager: true });

const messages: Record<string, { translation: Record<string, string> }> = {
  en: { translation: {} },
  fr: { translation: {} },
};

Object.values(modules).forEach((mod) => {
  const data = ((mod as { default?: unknown }).default ?? mod) as Partial<Record<'en' | 'fr', Record<string, string>>>;
  for (const lang of ['en', 'fr'] as const) {
    Object.assign(messages[lang].translation, data[lang] ?? {});
  }
});

export default messages;
