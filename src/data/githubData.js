export const githubProfile = {
  username: "Abhishek-Sharma-069",
  profileUrl: "https://github.com/Abhishek-Sharma-069",
  contributionsApi: "https://github-contributions-api.jogruber.de/v4/Abhishek-Sharma-069?y=last",
  email: "abhello12@gmail.com",
  handle: "@thelone.boy",
  tagline: "Campus Ambassador @ GeeksforGeeks · CSE · AKTU 2022–2026",
  highlights: [
    "GSSoC 2024 Extended contributor",
    "Full-stack & AI systems",
    "Building in public",
  ],
  identity: {
    pronouns: "He / Him",
    code: ["C++", "Python", "Java", "JavaScript", "React", "MySQL"],
  },
  education: [
    {
      qualification: "B.Tech CSE",
      institute: "United Institute of Technology",
      years: "2022 – Present",
      score: "8 CGPA",
    },
    {
      qualification: "Intermediate",
      institute: "C.L. Inter College, Sultanpur",
      years: "2020 – 2021",
      score: "79.17%",
    },
  ],
  platforms: [
    { name: "LeetCode", url: "https://leetcode.com/u/Abhishek_Sharma_069/" },
    { name: "HackerRank", url: "https://www.hackerrank.com/profile/abhi_sheksharma" },
    { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/user/theabhisheksharma/" },
    { name: "Coding Ninjas", url: "https://www.naukri.com/code360/profile/AbhisheKSharmaX" },
  ],
};

export function summarizeContributions(contributions = []) {
  let activeDays = 0;
  let bestDay = { date: null, count: 0 };
  let currentStreak = 0;
  let maxStreak = 0;
  let streak = 0;

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const today = sorted[sorted.length - 1]?.date;

  for (const day of sorted) {
    if (day.count > 0) {
      activeDays += 1;
      streak += 1;
      maxStreak = Math.max(maxStreak, streak);
      if (day.count > bestDay.count) bestDay = { date: day.date, count: day.count };
    } else {
      streak = 0;
    }
  }

  // current streak ending at latest day
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) currentStreak += 1;
    else break;
  }

  return { activeDays, bestDay, currentStreak, maxStreak, today };
}

/** Group flat daily contributions into week columns (Sun→Sat rows). */
export function buildHeatmapWeeks(contributions = []) {
  if (!contributions.length) return [];

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const weeks = [];
  let week = new Array(7).fill(null);

  for (const day of sorted) {
    const dow = new Date(`${day.date}T12:00:00`).getDay(); // 0 Sun
    week[dow] = day;
    if (dow === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
  }
  if (week.some(Boolean)) weeks.push(week);
  return weeks;
}

export const LEVEL_COLORS = [
  "bg-white/[0.04]",
  "bg-sky-300/25",
  "bg-sky-300/45",
  "bg-violet-300/55",
  "bg-rose-300/70",
];
