export interface Profile {
  photo: string;
  fullName: string;
  jobTitle: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  dateRange: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  dateRange: string;
  coursework?: string[];
  achievements?: string[];
}

export interface CurrentActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

export const profileData: Profile = {
  photo: 'https://via.placeholder.com/200',
  fullName: 'Kristi Ekonomi',
  jobTitle: 'React Developer',
  summary: 'As a master\'s graduate in Software Engineering with experience in software development, I am passionate about creating high-quality software and eager to leverage the latest technologies. Confident in my problem-solving abilities, I am looking to join a company that values innovation and offers career progression for technologically adept individuals. I am enthusiastic to collaborate with brilliant colleagues who challenge me to excel further.',
  email: 'kristi1ekonomi@gmail.com',
  phone: '+355693989084',
  location: 'Tirana, Albania',
};

export const experienceData: Experience[] = [
  {
    id: '1',
    jobTitle: 'React Developer',
    company: 'Almotech shpk',
    dateRange: 'March 2024 — Now',
    responsibilities: [
      'Experienced React Native and React Developer with a strong background in designing and developing scalable, high-performance applications for both mobile and web platforms.',
      'Mobile Development (React Native – Primary Focus): Designed and developed several cross-platform mobile applications for iOS and Android, with a focus on performance, intuitive UI, and smooth user experiences. Worked on e-commerce apps, implementing features like product catalogs, cart functionality, real-time inventory, and secure user authentication. Developed social and community-based applications, integrating features like user profiles, media uploads, messaging, notifications, and activity feeds. Focused on building reusable components, managing application state effectively, and optimizing app performance to meet platform standards. Handled full app lifecycles—from prototyping and UI implementation to debugging, testing, and release.',
      'Web Development (React.js): Built dynamic and responsive web applications using React.js, with attention to performance, accessibility, and scalability. Implemented reusable component libraries and ensured consistent theming and layout across different screens and devices. Collaborated with backend developers to consume RESTful APIs and display complex data structures efficiently.',
      'Project Collaboration & Workflow: Worked closely with designers to translate UI/UX concepts into functional and visually consistent components. Partnered with backend teams to define API requirements and data models. Ensured clear communication with stakeholders, delivering progress updates and incorporating feedback quickly.',
      'Professional Strengths: Solid understanding of mobile UI/UX best practices and platform-specific behaviors. Skilled in debugging, profiling, and performance tuning across devices. Strong ability to adapt and contribute to new or existing codebases efficiently. Committed to writing clean, maintainable, and scalable code, with attention to detail and a problem-solving mindset.',
    ],
  },
  {
    id: '2',
    jobTitle: 'React Developer',
    company: 'Inovacion shpk',
    dateRange: 'February 2023 — March 2024',
    responsibilities: [
      'Developed and maintained React and React Native applications',
      'Collaborated with cross-functional teams to deliver features on time',
      'Implemented responsive web interfaces and mobile applications',
      'Worked with REST APIs and integrated third-party services',
    ],
  },
  {
    id: '3',
    jobTitle: 'React Native Developer (Intern)',
    company: 'AlCoders',
    dateRange: 'June 2022 — August 2022',
    responsibilities: [
      'Played a key role in improving the company\'s project using Expo Documentation and diverse React Native packages',
      'Focused on optimizing the codebase for improved clarity and ease of future modifications',
      'Developed custom algorithms independently, showcasing a proactive and innovative problem-solving approach within the project',
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Mobile App',
    description: 'A full-featured e-commerce mobile application with user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Stripe API'],
    githubLink: 'https://github.com/example/ecommerce-app',
    demoLink: 'https://demo.example.com/ecommerce',
  },
  {
    id: '2',
    name: 'Task Management System',
    description: 'A collaborative task management system with real-time updates, team collaboration features, and analytics dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
    githubLink: 'https://github.com/example/task-manager',
  },
  {
    id: '3',
    name: 'Weather Forecast App',
    description: 'A beautiful weather application that provides detailed forecasts, weather maps, and location-based recommendations.',
    technologies: ['React Native', 'TypeScript', 'Weather API', 'Maps API'],
    githubLink: 'https://github.com/example/weather-app',
    demoLink: 'https://demo.example.com/weather',
  },
  {
    id: '4',
    name: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with insights, scheduling, and engagement tracking.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'REST API', 'Material-UI'],
    githubLink: 'https://github.com/example/social-dashboard',
  },
];

export const educationData: Education[] = [
  {
    id: '1',
    degree: 'Master of Science, Information Technology with profile Development Software',
    institution: 'European University of Tirana',
    dateRange: 'September 2020 — June 2022',
    coursework: [
      'Software Engineering',
      'Information Technology',
      'Software Development',
    ],
  },
  {
    id: '2',
    degree: 'Bachelor, Mathematics-Informatics',
    institution: 'Faculty of Natural and Human Sciences "Fan S. Noli University", Korçë',
    dateRange: 'September 2017 — June 2020',
  },
  {
    id: '3',
    degree: 'High School',
    institution: '"Thimi Marko", Korçë',
    dateRange: 'September 2014 — June 2017',
  },
  {
    id: '4',
    degree: 'React Developer Course',
    institution: 'ikubINFO Academy, Tirana',
    dateRange: 'December 2022 — February 2023',
    coursework: [
      'Applied React expertise in a course, focusing on key concepts like API data retrieval, hooks, and props through practical exercises',
      'Executed an individual project, a YouTube Clone, utilizing RapidApi for data and Material UI for styling',
      'Developed features such as a search bar, categorized navbar, and detailed video/channel information, suggested videos',
      'Emphasized code clarity and React proficiency, showcasing an ability to implement various frontend elements effectively',
    ],
  },
];

export interface CurrentActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

export const currentActivities: CurrentActivity[] = [
  {
    id: '1',
    title: 'Building Mobile Applications',
    description: 'Developing cross-platform mobile apps with React Native, focusing on performance and user experience',
    icon: 'phone-portrait',
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'Creating responsive web applications using React.js and modern frontend technologies',
    icon: 'globe',
  },
  {
    id: '3',
    title: 'Learning & Improving',
    description: 'Continuously learning new technologies and best practices in software development',
    icon: 'school',
  },
];

export const historyItems: HistoryItem[] = [
  {
    id: '1',
    title: 'Started at Almotech shpk',
    description: 'Joined as React Developer, working on mobile and web applications',
    date: 'March 2024',
    icon: 'briefcase',
  },
  {
    id: '2',
    title: 'Completed React Developer Course',
    description: 'Finished comprehensive React course at ikubINFO Academy',
    date: 'February 2023',
    icon: 'school-outline',
  },
  {
    id: '3',
    title: 'Graduated with Master\'s Degree',
    description: 'Completed Master of Science in Information Technology',
    date: 'June 2022',
    icon: 'trophy-outline',
  },
  {
    id: '4',
    title: 'Internship at AlCoders',
    description: 'Worked as React Native Developer intern, improving company projects',
    date: 'August 2022',
    icon: 'code-slash-outline',
  },
];
