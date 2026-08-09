export const fallbackProfile = {
  name: 'Dilshad Ali',
  role: 'Senior Software Engineer',
  company: 'EY',
  yearsExperience: '05',
  summary: 'Guidewire-certified engineer with nearly five years of experience delivering PolicyCenter configuration, rating, and production support for P&C insurance platforms.',
  skills: [
    'Python', 'Machine Learning', 'Deep Learning', 'OpenCV', 'React',
    'Guidewire PolicyCenter', 'Guidewire PC Rating', 'Guidewire PC Configuration',
    'Gosu', 'HTML/CSS', 'JavaScript', 'SQL', 'Java', 'Data Structures', 'Blue Prism',
  ],
  email: 'mddilshadali2410@gmail.com',
  location: 'Kolkata, India',
  experience: [
    {
      period: 'Apr 2025 - Present', role: 'Senior Software Engineer', company: 'Ernst & Young', location: 'Kolkata',
      points: ['Own Guidewire PolicyCenter configuration, rating, and production support.', 'Lead PCF screen, validation, and rule-set enhancements for stronger usability and performance.', 'Support state rollouts, data fixes, issue triage, and compliance-aligned delivery.'],
    },
    {
      period: 'Oct 2021 - Apr 2025', role: 'Associate Consultant', company: 'Capgemini', location: 'Kolkata',
      points: ['Managed PolicyCenter incidents and configuration work to minimize business disruption.', 'Delivered rate books, rate routines, and rate tables for four new state rollouts.', 'Automated Data Hub workflows using Blue Prism RPA to reduce manual effort and errors.'],
    },
  ],
  achievements: ['Guidewire Associate Certification', 'Achiever Extraordinaire Award - EY (2025 and 2026)', 'Capgemini Certified PolicyCenter Developer Level 1', 'Ranked 3rd in Industry Domain Training (Capgemini)'],
  certifications: [
    { name: 'Guidewire Certified Associate', date: 'Apr 2026', detail: 'Achieved certification demonstrating core proficiency in Guidewire PolicyCenter configuration, integration, and development.', url: 'https://drive.google.com/file/d/1zGK95NsI7M6z6xvSB67Mu3XT5hb_JV3w/view?usp=drive_link' },
    { name: 'AWS Certified Cloud Practitioner', date: 'Dec 2022', detail: 'Obtained the AWS Certified Cloud Practitioner certification, demonstrating a solid understanding of cloud computing concepts, AWS services, and foundational architectural principles.', url: 'https://drive.google.com/file/d/1lqZrBBKo06fAsdepUtyTVp1XYG5CqIR-/view?usp=sharing' },
  ],
  education: { degree: 'BTech - Computer Science and Engineering', school: 'Calcutta Institute of Engineering and Management', date: 'Graduated July 2021', score: 'CGPA 8.24 / 10' },
}

export async function loadProfile() {
  const endpoint = window.__PORTFOLIO_CONFIG__?.resumeApiUrl
  if (!endpoint) return fallbackProfile
  const response = await fetch(endpoint, { cache: 'no-store' })
  if (!response.ok) throw new Error('Resume service is unavailable')
  const remote = await response.json()
  const experience = remote.experience?.length ? remote.experience : fallbackProfile.experience
  return {
    ...fallbackProfile,
    ...remote,
    role: remote.role || experience[0]?.role || fallbackProfile.role,
    company: remote.company || experience[0]?.company || fallbackProfile.company,
    yearsExperience: remote.yearsExperience || fallbackProfile.yearsExperience,
    email: remote.email?.trim() || fallbackProfile.email,
    phone: remote.phone?.trim() || fallbackProfile.phone,
    location: remote.location?.trim() || fallbackProfile.location,
    skills: remote.skills?.length ? remote.skills : fallbackProfile.skills,
    experience,
    achievements: remote.achievements?.length ? remote.achievements : fallbackProfile.achievements,
    certifications: remote.certifications?.length ? remote.certifications : fallbackProfile.certifications,
    education: remote.education?.degree && remote.education?.school ? remote.education : fallbackProfile.education,
  }
}
