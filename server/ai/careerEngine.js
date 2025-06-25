// Simple AI logic based on keywords — MVP version
const careerMap = [
  {
    title: "Software Developer",
    requiredSkills: ["javascript", "python", "node", "react"],
    interests: ["technology", "automation", "apps"],
  },
  {
    title: "UX Designer",
    requiredSkills: ["figma", "design", "prototyping"],
    interests: ["creativity", "interfaces", "psychology"],
  },
  {
    title: "Digital Marketer",
    requiredSkills: ["seo", "content", "ads"],
    interests: ["social media", "growth", "strategy"],
  },
  {
    title: "Data Analyst",
    requiredSkills: ["excel", "sql", "python", "analytics"],
    interests: ["data", "patterns", "insights"],
  },
  {
    title: "Project Manager",
    requiredSkills: ["organization", "planning", "jira"],
    interests: ["leadership", "management", "delivery"],
  },
];

export const suggestCareers = (skills = [], interests = []) => {
  const matches = [];

  for (const career of careerMap) {
    const skillScore = career.requiredSkills.filter((s) =>
      skills.includes(s.toLowerCase())
    ).length;

    const interestScore = career.interests.filter((i) =>
      interests.includes(i.toLowerCase())
    ).length;

    const totalScore = skillScore + interestScore;

    if (totalScore > 1) {
      matches.push({
        title: career.title,
        confidence: Math.min(100, totalScore * 20),
      });
    }
  }

  return matches.sort((a, b) => b.confidence - a.confidence);
};
