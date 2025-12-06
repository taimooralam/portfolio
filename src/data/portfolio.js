export const profile = {
  name: "Taimoor Alam",
  title: "Engineering Leader / Software Architect",
  tagline: "Cloud | AdTech | DDD | Leadership",
  summary: "Engineering leader with 11+ years building high-scale distributed systems and 5+ years managing cross-functional teams in AdTech and SaaS environments. Expert in modernizing legacy architectures through Domain-Driven Design and event-driven microservices, delivering 75% incident reduction and 25% faster delivery. Proven track record architecting AI-powered solutions, implementing observability at billions-per-day scale, and driving technical strategy that preserved €30M revenue through GDPR compliance.",
  location: "German National | International relocation ready (Hybrid, 2 months notice)",
  email: "alamtaimoor.de@gmail.com",
  phone: "+49 176 2979 3925",
  linkedin: "linkedin.com/in/taimooralam",
  languages: ["English (C1)", "German (B2)", "Urdu (Native)"],
  education: {
    masters: "M.Sc. Computer Science - Technical University of Munich",
    bachelors: "B.Sc. Computer Software Engineering - GIK Institute"
  },
  certifications: ["AWS Essentials", "ECS & Multi-Region LB", "Data Scientist's Toolbox", "R Programming"]
};

export const heroStats = [
  { value: "11+", label: "Years Experience" },
  { value: "5+", label: "Years Leadership" },
  { value: "€30M+", label: "Revenue Protected" },
  { value: "75%", label: "Incident Reduction" }
];

export const skills = {
  leadership: {
    title: "Leadership & Strategy",
    items: ["Technical Leadership", "Team Building & Mentoring", "Hiring & Interviewing", "Strategic Planning", "Stakeholder Management", "Risk Analysis", "Blameless Postmortems", "Innovation Culture"]
  },
  architecture: {
    title: "Architecture & Design",
    items: ["Event-Driven Architecture", "Domain-Driven Design", "CQRS/Event Sourcing", "Microservices", "Cloud-Native Architecture", "Legacy Modernization", "Agentic AI"]
  },
  platform: {
    title: "Platform & Scale",
    items: ["AWS (Lambda, ECS, EventBridge, S3)", "Node.js/TypeScript", "Python", "OpenSearch", "Terraform/Serverless", "Observability", "High Availability"]
  },
  delivery: {
    title: "Delivery & Quality",
    items: ["Agile/SCRUM", "CI/CD Pipelines", "Test-Driven Development", "Technical Debt Strategy", "GDPR/TCF Compliance", "Event Storming", "Architecture Governance"]
  }
};

export const experience = [
  {
    role: "Technical Lead (Addressable TV)",
    company: "Seven.One Entertainment Group",
    location: "Munich, DE",
    period: "2020–Present",
    highlights: [
      "Led multi-year transformation of AdTech platform processing millions of impressions daily into event-driven microservices",
      "Achieved 75% incident reduction and zero downtime for 3 years through architectural runway strategy",
      "Architected real-time observability pipeline processing billions of events daily with 10x cost reduction",
      "Led GDPR/TCF compliance as first-movers in EU for TCF-approved CMP, protecting €30M revenue",
      "Mentored 10+ senior engineers, promoted 3 to lead positions with low turnover",
      "Introduced DDD framework reducing onboarding from 6 to 3 months and improving velocity by 25%"
    ]
  },
  {
    role: "Lead Software Engineer",
    company: "Samdock (Daypaio)",
    location: "Munich, DE",
    period: "2019–2020",
    highlights: [
      "Architected event-sourced CRM platform (0→1) using CQRS with NestJS/TypeScript and EventStore",
      "Led event storming workshops for domain discovery and bounded context definition",
      "Led cross-functional SCRUM team of 4 engineers, improving sprint velocity by 30%",
      "Established 85% code coverage reducing bugs by 40%, designed APIs with Swagger for 50% faster integrations"
    ]
  },
  {
    role: "Intermediate Backend Engineer",
    company: "KI Labs",
    location: "Munich, DE",
    period: "2018–2019",
    highlights: [
      "Built REST APIs in Flask with onion architecture and JWT authentication",
      "Implemented MongoDB optimizations reducing query times by 60%",
      "Developed comprehensive testing strategy reducing production incidents by 35%"
    ]
  },
  {
    role: "Backend Engineer",
    company: "Fortis (Research Project)",
    location: "Munich, DE",
    period: "2018",
    highlights: [
      "Designed Node.js microservices architecture for research platform",
      "Implemented RabbitMQ pub/sub messaging for asynchronous service communication",
      "Established API standards with Swagger documentation"
    ]
  },
  {
    role: "Software Engineer (IoT)",
    company: "OSRAM",
    location: "Munich, DE",
    period: "2016–2018",
    highlights: [
      "Built cross-platform Qt/C++ application for IoT lighting control, used extensively for business demonstrations",
      "Developed Python CoAP-to-UDP middleware enabling third-party device integration",
      "Enhanced Erbium CoAP with OSCOAP security features for secure multicast communication",
      "Integrated legacy OSRAM products with modern OpenAIS ecosystem"
    ]
  },
  {
    role: "Software Engineer",
    company: "Clary Icon",
    location: "Islamabad, PK",
    period: "2014–2016",
    highlights: [
      "Developed WebRTC video recording system using Licode and FFmpeg, securing contract renewal",
      "Built Node.js playback service with WebSocket sync for multi-party call compliance review",
      "Reverse-engineered and enhanced OpenPhone SIP client with Qt C++ for custom call management",
      "Created C# WPF onboarding tutorial system with voice narration reducing support requests"
    ]
  }
];

export const projects = [
  {
    id: "platform-modernization",
    title: "Platform Modernization - Monolith to Microservices",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["AdTech", "Cloud Architecture", "Software Modernization"],
    keyMetric: { value: "75%", label: "Incident Reduction" },
    situation: "Legacy monolith causing slow delivery and fragile deployments across the AdTech platform. Heavy technical debt with callback hell and many dependent modules.",
    task: "Refactor and stabilize the system while maintaining continuous delivery for millions of ad impressions.",
    actions: [
      "Led multi-year modernization, decomposing monolith into event-driven microservices",
      "Introduced Domain-Driven Design (DDD) and ubiquitous language",
      "Implemented AWS-based CI/CD pipelines, observability, and fault-tolerant architecture"
    ],
    results: [
      "Reduced incidents by 75%",
      "Improved release cycle time from weeks to days",
      "Onboarded new engineers 50% faster (6→3 months)",
      "No downtime reported in 3 straight years"
    ],
    skills: ["DDD", "Event-Driven Architecture", "Microservices", "AWS", "Node.js", "TypeScript"]
  },
  {
    id: "data-pipeline",
    title: "Billion-Scale Data Observability Pipeline",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Data Engineering", "Cloud Architecture", "Observability"],
    keyMetric: { value: "10x", label: "Cost Reduction" },
    situation: "Multi-million user platform generating billions of data points daily with inadequate observability infrastructure.",
    task: "Plan, architect, and implement scalable data pipeline to channel billions of data points per day to modern observability platform.",
    actions: [
      "Designed event-driven pipeline leveraging AWS Kinesis for high-throughput streaming",
      "Implemented OpenSearch for real-time analytics",
      "Created dashboards and alerting for proactive incident detection"
    ],
    results: [
      "Successfully processed billions of data points per day with sub-second latency",
      "Achieved 10x decrease in infrastructure costs",
      "Reduced MTTD and MTTR significantly"
    ],
    skills: ["AWS Kinesis", "OpenSearch", "Data Pipeline", "Stream Processing", "Real-Time Analytics"]
  },
  {
    id: "gdpr-compliance",
    title: "GDPR/TCF Compliance Leadership",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Compliance", "GDPR", "Risk Management"],
    keyMetric: { value: "€30M", label: "Revenue Protected" },
    situation: "Platform generating €30M annually faced existential compliance risk without TCF 2.0 compliant consent management.",
    task: "Lead rapid development of TCF 2.0 compliant CMP for HbbTV, pass multiple GDPR audits, and preserve revenue.",
    actions: [
      "Led technical assessment of TCF 2.0 requirements",
      "Architected CMP solution integrating with existing ad delivery",
      "Coordinated with legal, privacy officers, and QA teams"
    ],
    results: [
      "Passed multiple GDPR audits with zero critical findings",
      "Preserved €30M in annual advertising revenue",
      "Zero disruption to live ad delivery during CMP rollout"
    ],
    skills: ["GDPR", "TCF 2.0", "Consent Management", "Privacy Engineering", "Compliance Architecture"]
  },
  {
    id: "scalability",
    title: "Bursty Traffic Scalability Engineering",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Scalability", "Performance Engineering", "AI/ML"],
    keyMetric: { value: "100x", label: "Burst Capacity" },
    situation: "Multi-million user system faced severe performance challenges during bursty prime-time traffic patterns.",
    task: "Lead architectural redesign to handle extreme bursty traffic patterns using AI-driven approaches.",
    actions: [
      "Redesigned auto-scaling strategies with AWS Lambda and ECS",
      "Utilized agentic AI tools to accelerate development",
      "Implemented caching, circuit breakers, and graceful degradation"
    ],
    results: [
      "Scaled to handle 10x-100x traffic bursts",
      "Maintained sub-second latency during peak loads",
      "Accelerated development with AI-assisted coding"
    ],
    skills: ["Auto-Scaling", "AWS Lambda", "ECS", "Performance Optimization", "Agentic AI"]
  },
  {
    id: "innovation",
    title: "Innovation Leadership - Revenue Growth",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Innovation", "Product Leadership", "Revenue Growth"],
    keyMetric: { value: "~20%", label: "Revenue Increase" },
    situation: "Mature platform requiring continuous innovation to drive revenue growth and competitive differentiation.",
    task: "Own and spearhead innovation initiatives to increase advertising reach and revenue by ~20%.",
    actions: [
      "Identified opportunities through market research and competitive analysis",
      "Led cross-functional innovation workshops",
      "Championed rapid prototyping and MVP approaches"
    ],
    results: [
      "Delivered multiple initiatives increasing reach/revenue by ~20%",
      "Established repeatable innovation process",
      "Strengthened competitive positioning"
    ],
    skills: ["Product Innovation", "Technical Strategy", "Cross-Functional Leadership", "MVP Development"]
  },
  {
    id: "team-building",
    title: "Engineering Team Building & Culture",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Leadership", "Talent Management", "Engineering Culture"],
    keyMetric: { value: "Low", label: "Turnover Rate" },
    situation: "Growing platform requiring team expansion in competitive hiring market with retention challenges.",
    task: "Build great engineering team through end-to-end hiring, selection, and growth culture.",
    actions: [
      "Defined hiring strategy with comprehensive selection criteria",
      "Designed multi-stage technical assessments",
      "Established growth plans and career development paths"
    ],
    results: [
      "Built and expanded high-performing engineering team",
      "Maintained low turnover despite challenging environment",
      "Developed multiple engineers into technical leadership roles"
    ],
    skills: ["Hiring Strategy", "Technical Interviews", "Team Building", "Mentorship", "Career Development"]
  },
  {
    id: "culture-revival",
    title: "Engineering Culture Revival",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Engineering Culture", "Developer Experience"],
    keyMetric: { value: "60%", label: "Engagement Increase" },
    situation: "High engineer turnover due to frustration with obsolete legacy tech stack and low morale.",
    task: "Rebuild engagement through modern technical practices and ownership culture.",
    actions: [
      "Introduced state-of-the-art cloud-native stack (TypeScript, microservices, serverless)",
      "Migrated to AWS Step Functions and EventBridge",
      "Created CI/CD pipelines giving engineers autonomy"
    ],
    results: [
      "Engineer engagement increased 60%",
      "Voluntary turnover declined sharply",
      "Innovation culture revived with multiple new internal projects"
    ],
    skills: ["AWS Step Functions", "EventBridge", "Serverless", "Developer Experience", "Culture Building"]
  },
  {
    id: "code-quality",
    title: "Code Quality Transformation",
    company: "Seven.One Entertainment Group",
    period: "2020–Present",
    domains: ["Code Quality", "Architecture"],
    keyMetric: { value: "50%", label: "Faster Onboarding" },
    situation: "Large-scale system with callback hell, poor inheritance, and unclear ownership causing high bug frequency.",
    task: "Refactor fragile codebase into coherent, maintainable architecture while maintaining delivery.",
    actions: [
      "Introduced DDD with clear domains and value objects",
      "Refactored callback-based code to Promises and async/await",
      "Embedded Test-Driven Development practices"
    ],
    results: [
      "Reduced bug frequency from monthly to weekly cycles",
      "Cut onboarding time from 6 to 3 months (50%)",
      "Release cycles improved from weeks to days"
    ],
    skills: ["DDD", "TDD", "Clean Code", "Refactoring", "Node.js", "TypeScript"]
  },
  {
    id: "crm-platform",
    title: "Event-Sourced CRM Platform (0→1)",
    company: "Samdock (Daypaio)",
    period: "2019–2020",
    domains: ["CRM", "SaaS", "Event-Driven Architecture"],
    keyMetric: { value: "25", label: "Production Tenants" },
    situation: "Early-stage startup building greenfield CRM platform requiring scalable event-sourced architecture and rapid market delivery.",
    task: "Architect and launch event-sourced CRM platform from inception to production as Lead Engineer.",
    actions: [
      "Led event storming workshops with stakeholders for domain discovery and bounded contexts",
      "Designed event-driven microservices with NestJS, TypeScript, and EventStore using CQRS pattern",
      "Established engineering standards with 85% test coverage and reusable Angular component library"
    ],
    results: [
      "Launched platform with 25 production tenants within startup timeline",
      "Reduced bugs by 40% through comprehensive testing strategy",
      "Mentored junior engineer to mid-level promotion within 12 months"
    ],
    skills: ["NestJS", "TypeScript", "EventStore", "CQRS", "Event Sourcing", "Angular", "Event Storming"]
  },
  {
    id: "backend-services",
    title: "Clean Architecture Backend Services",
    company: "KI Labs GmbH",
    period: "2018–2019",
    domains: ["Backend Development", "Data Pipelines", "API Design"],
    keyMetric: { value: "60%", label: "Query Time Reduction" },
    situation: "Data-driven product requiring flexible backend services over dynamic data pipeline.",
    task: "Design and build RESTful services using clean architecture principles.",
    actions: [
      "Designed Flask services using onion architecture",
      "Built dynamic data pipeline adapters for MongoDB",
      "Implemented comprehensive Pytest coverage"
    ],
    results: [
      "Delivered production-ready services with maintainable architecture",
      "Achieved high test coverage",
      "Successfully integrated secure JWT authentication"
    ],
    skills: ["Python", "Flask", "MongoDB", "Onion Architecture", "Pytest", "REST API"]
  },
  {
    id: "iot-protocol",
    title: "IoT Protocol Development",
    company: "OSRAM GmbH",
    period: "2016–2018",
    domains: ["IoT", "Embedded Systems", "Protocol Development"],
    keyMetric: { value: "Secure", label: "Multicast CoAP" },
    situation: "Smart lighting system requiring secure IoT communication and device integration.",
    task: "Extend CoAP protocol with OSCOAP security, develop middleware, create demo applications.",
    actions: [
      "Implemented OSCOAP security extensions in erbium CoAP",
      "Developed Python CoAP-to-UDP translation middleware",
      "Built cross-platform Qt/C++ lighting control application"
    ],
    results: [
      "Extended CoAP with multicast security capabilities",
      "Enabled third-party device integration",
      "Application extensively used for business demonstrations"
    ],
    skills: ["CoAP", "OSCOAP", "C/C++", "Qt", "QML", "Python", "IoT"]
  },
  {
    id: "video-conferencing",
    title: "WebRTC Video Recording & Playback System",
    company: "Clary Icon",
    period: "2014–2016",
    domains: ["Real-Time Communications", "Video Processing", "Full-Stack"],
    keyMetric: { value: "Contract", label: "Renewal Secured" },
    situation: "Enterprise video conferencing platform required call recording for compliance and multi-party playback capabilities.",
    task: "Design and implement WebRTC recording system and synchronized playback service for compliance review.",
    actions: [
      "Developed WebRTC recording solution using Licode media server with custom REST APIs",
      "Built FFmpeg transcoding pipeline for format conversion and storage",
      "Engineered Node.js playback service with WebSocket-based timestamp synchronization"
    ],
    results: [
      "Delivered client-critical feature that secured contract renewal and continued funding",
      "Enabled compliance and quality review through synchronized multi-party call playback",
      "Demonstrated cross-platform polyglot capability (Node.js, C++, C#)"
    ],
    skills: ["WebRTC", "Licode", "FFmpeg", "Node.js", "WebSocket", "REST API", "MySQL"]
  }
];

export const featuredMetrics = [
  { value: "75%", label: "Incident Reduction", context: "AdTech Platform Modernization" },
  { value: "€30M", label: "Revenue Protected", context: "GDPR Compliance Leadership" },
  { value: "3 Years", label: "Zero Downtime", context: "System Reliability" },
  { value: "Billions", label: "Events/Day", context: "Data Pipeline Scale" },
  { value: "10x", label: "Cost Reduction", context: "Infrastructure Optimization" },
  { value: "~20%", label: "Revenue Growth", context: "Innovation Initiatives" },
  { value: "50%", label: "Faster Onboarding", context: "Team Efficiency" },
  { value: "100x", label: "Burst Capacity", context: "Scalability Engineering" }
];
