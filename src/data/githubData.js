export const githubProfile = {
  username: "Abhishek-Sharma-069",
  profileUrl: "https://github.com/Abhishek-Sharma-069",
  email: "abhello12@gmail.com",
  handle: "@thelone.boy",
  tagline: "Campus Ambassador @ GeeksforGeeks | CSE, Batch of 2022–2026, AKTU",
  highlights: [
    "Contributor at GirlScript Summer of Code, 2024 Extended",
    "Currently learning Web Dev & Data Analytics",
    "Ask me about Full Stack, Frontend & Backend",
  ],
  identity: {
    pronouns: "He / Him",
    code: ["C++", "Python", "Java", "JavaScript", "HTML", "CSS", "MySQL"],
    askMeAbout: ["Web Dev", "Frontend", "Backend", "Python", "Java"],
    frontend: ["HTML", "CSS", "JS", "Tailwind", "React"],
    backend: ["Node.js", "Express.js", "Databases"],
  },
  education: [
    {
      qualification: "B.Tech CSE",
      institute: "United Institute of Technology Prayagraj",
      board: "AKTU",
      years: "Nov 2022 – Present",
      score: "8 CGPA",
    },
    {
      qualification: "Intermediate",
      institute: "C.L. Inter College Chhittepatti Sultanpur",
      board: "UP Board",
      years: "2020 – 2021",
      score: "79.17%",
    },
    {
      qualification: "High School",
      institute: "C.L. Inter College Chhittepatti Sultanpur",
      board: "UP Board",
      years: "2018 – 2019",
      score: "76.67%",
    },
  ],
  platforms: [
    { name: "LeetCode", url: "https://leetcode.com/u/Abhishek_Sharma_069/" },
    { name: "HackerRank", url: "https://www.hackerrank.com/profile/abhi_sheksharma" },
    { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/user/theabhisheksharma/" },
    { name: "Coding Ninjas", url: "https://www.naukri.com/code360/profile/AbhisheKSharmaX" },
  ],
};

const theme = {
  bg: "030303",
  title: "fafafa",
  text: "a1a1aa",
  icon: "7dd3fc",
  ring: "c4b5fd",
};

export const githubStatCards = {
  stats: `https://github-readme-stats.vercel.app/api?username=${githubProfile.username}&show_icons=true&hide_border=true&bg_color=${theme.bg}&title_color=${theme.title}&text_color=${theme.text}&icon_color=${theme.icon}&ring_color=${theme.ring}`,
  streak: `https://github-readme-streak-stats.herokuapp.com/?user=${githubProfile.username}&theme=dark&hide_border=true&background=${theme.bg}&stroke=${theme.bg}&ring=${theme.icon}&fire=${theme.ring}&currStreakLabel=${theme.title}&sideLabels=${theme.text}&currStreakNum=${theme.title}&sideNums=${theme.text}&dates=${theme.text}`,
  topLangs: `https://github-readme-stats.vercel.app/api/top-langs?username=${githubProfile.username}&layout=compact&hide_border=true&bg_color=${theme.bg}&title_color=${theme.title}&text_color=${theme.text}`,
  activity: `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubProfile.username}&theme=github_dark&hide_border=true`,
  views: `https://komarev.com/ghpvc/?username=${githubProfile.username}&label=Profile%20views&color=7dd3fc&style=flat`,
};
