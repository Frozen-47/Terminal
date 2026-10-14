interface SearchableProject {
  name: string;
  description?: string | null;
  language?: string | null;
  tag?: string;
  topics?: string[];
}

export function matchesProject(project: SearchableProject, query: string, translatedDescription = '') {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const text = [project.name, project.description, project.language, project.tag,
    ...(project.topics ?? []), translatedDescription].filter(Boolean).join(' ').toLocaleLowerCase();
  return terms.every(term => text.includes(term));
}
