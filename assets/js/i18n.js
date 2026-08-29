/**
 * Simple vanilla-JS i18n for a static site (no build step).
 * Walks every [data-i18n] element and swaps its text content based on the
 * selected language. Language choice is detected from the browser on first
 * visit, then persisted in localStorage once the visitor picks manually.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "site_lang";

  const dict = {
    en: {
      "meta.home.title": "Lucas Lanza | Software Projects Portfolio",
      "meta.home.description": "Explore Lucas Lanza's software projects — .NET, Flutter, and full-stack systems built for real clients and products. Get in touch.",
      "meta.perfil.title": "Lucas Lanza | Resume & Experience",
      "meta.perfil.description": "Lucas Lanza's resume — over four years of full-stack experience in .NET, Flutter, and API integrations. Skills, education, and professional history.",

      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.resume": "Resume",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "nav.perfil": "Profile",

      "hero.prefix": "I'm a",
      "hero.typedFallback": ".NET Software Engineer",
      "hero.intro": "I build full-stack web systems and apps. Take a look at the projects below, or get in touch.",

      "about.heading": "About Me",
      "about.p1": "I am a Software Engineer currently in the process of relocating to the US, with over four years of experience in full-stack development, specializing in .NET, Flutter, and API integrations. Passionate about problem-solving and system optimization, I've worked on both legacy and modern systems—enhancing performance, automating processes, and improving user experience.",
      "about.p2": "Beyond my professional work, I'm always exploring new technologies like cloud computing and automation.",
      "about.subheading": ".NET Software Engineer.",
      "about.birthdayLabel": "Birthday:",
      "about.birthdayValue": "11 May 1995",
      "about.phoneLabel": "Phone:",
      "about.cityLabel": "City:",
      "about.cityValue": "Presidente Prudente/SP, BRAZIL",
      "about.linkedinLabel": "LinkedIn:",
      "about.emailLabel": "Email:",
      "about.moveAbroadLabel": "Move Abroad:",
      "about.moveAbroadValue": "Available for relocation",

      "skills.heading": "Skills",
      "skills.description": "I explore diverse technologies in challenging and impactful projects, always seeking continuous learning and professional growth. Below are some of the main tools and technologies I've worked with in real-world applications:",
      "skills.dotnet.title": ".NET Framework & .NET Core",
      "skills.dotnet.desc": "4+ years of experience building internal systems, including payment integrations, booking modules, and dynamic reporting tools in enterprise environments.",
      "skills.flutter.title": "Flutter",
      "skills.flutter.desc": "3+ years of experience creating cross-platform apps with rich animations, Hive storage, AdSense integration, and custom game mechanics for personal and client-facing projects.",
      "skills.sql.title": "SQL Server & Informix",
      "skills.sql.desc": "4+ years working with complex queries, database optimization, and system integrations in critical environments such as education and financial systems.",
      "skills.bootstrap.title": "Bootstrap",
      "skills.bootstrap.desc": "Development of responsive layouts, dashboards, and data-driven interfaces integrated with Razor Pages and DataTables in administrative panels and public portals.",
      "skills.js.title": "JavaScript & jQuery",
      "skills.js.desc": "Used in enhancing UI/UX behavior in dynamic forms, real-time validations, and table interactions within complex .NET applications and custom components.",
      "skills.razor.title": "Razor Pages & C#",
      "skills.razor.desc": "Experience building maintainable web modules with clean architecture patterns, focusing on maintainability and extensibility in educational platforms.",

      "resume.heading": "Resume",
      "resume.description": "With years of experience in software development, I am passionate about creating innovative solutions that optimize processes and positively impact businesses and users.",
      "resume.educationTitle": "Education",
      "resume.activitiesTitle": "Activities",
      "resume.experienceTitle": "Professional Experience",

      "resume.edu1.title": "Specialist in Web Application Development",
      "resume.edu1.date": "2022 - 2024",
      "resume.edu1.school": "UNOESTE, University of Western São Paulo",
      "resume.edu2.title": "Postgraduate in Web Technologies and Innovations",
      "resume.edu2.date": "2021 - 2022",
      "resume.edu2.school": "Venda Nova do Imigrante College (FAVENI)",
      "resume.edu3.title": "Bachelor of Science in Information Systems",
      "resume.edu3.date": "2013 - 2016",
      "resume.edu3.school": "UNOESTE, University of Western São Paulo",

      "resume.activity1": "Microsoft Certified: Azure Fundamentals (AZ-900)",
      "resume.activity2": "Developed the \"Eu Nunca\" app, a web version of the \"I Never Ever\" game with AdSense and Firebase integration.",
      "resume.activity3": "Developed the \"Adviser\" app, an app that gives the best worst advice.",

      "resume.exp1.title": "Sr Analyst II Software Engineering",
      "resume.exp1.date": "November 2025 - Present",
      "resume.exp1.company": "DXC Technology, Remote",
      "resume.exp1.bullet1": "Work on project development and application support/maintenance in a fully remote role, delivering new features and resolving production issues for enterprise clients.",
      "resume.exp1.bullet2": "Collaborate with cross-functional teams across the software development lifecycle, from requirements analysis to deployment and post-release support.",

      "resume.exp2.title": "System Analyst",
      "resume.exp2.date": "2023 - November 2025",
      "resume.exp2.company": "UNOESTE, University of Western São Paulo, Presidente Prudente, SP",
      "resume.exp2.bullet1": "Developed a parking payment module for students and staff using .NET 6.0, Bootstrap, and Flutter, integrated with a Payments API. The system processes approximately 700 vehicles per month and generates an average monthly revenue of R$5,000.",
      "resume.exp2.bullet2": "Implemented a fully anonymous harassment reporting system integrated into the university's internal platform, built with .NET Framework 4.5. The module ensures employee confidentiality and automatically generates service protocols.",
      "resume.exp2.bullet3": "Built the \"Consulta TCE\" student document submission system using .NET Core, integrated with an Electronic Document Management System (GED). This eliminated the need for printed forms, processing nearly 5,000 documents from 1,000 students across 7 academic programs, improving document validation for institutional partners.",
      "resume.exp2.bullet4": "Created a Self-Service Totem desktop system featuring client-side functionalities, restricted content access, and activity logging through Elasticsearch, enhancing user autonomy and operational transparency.",
      "resume.exp2.bullet5": "Managed ongoing system maintenance and deployments, resolving bugs, analyzing the feasibility of new features, and applying performance improvements to optimize system behavior.",
      "resume.exp2.bullet6": "Optimized and developed SQL queries in Informix and SQL Server databases, resulting in faster data retrieval and enhanced application performance.",

      "resume.exp3.title": ".NET Software Engineer",
      "resume.exp3.date": "2021 - 2023",
      "resume.exp3.company": "COBMAIS, Presidente Prudente, SP",
      "resume.exp3.bullet1": "Provided Tier 2 technical support (Level 2) by resolving complex bugs, correcting database inconsistencies, and fixing API/WebService integrations. Acted as the bridge between Level 1 support and the development team, effectively handling over 2,000 escalated tickets, including critical production issues.",
      "resume.exp3.bullet2": "Collaborated with client development teams to diagnose and resolve integration problems, ensuring the successful deployment of 15+ third-party API integrations.",
      "resume.exp3.bullet3": "Mentored junior support engineers, providing technical guidance and process knowledge, which significantly reduced ticket resolution times and improved team efficiency.",
      "resume.exp3.bullet4": "Created and delivered a comprehensive training program on the internal Stage Database, attended by 105 users, with 65 completions, empowering new employees and clients to utilize system features better.",
      "resume.exp3.bullet5": "Led the development of a beta version of \"Dynamic Data Extractions\", combining JS Flexmonster, ETL practices, and optimized SQL queries to improve reporting and data accessibility.",

      "resume.exp4.title": "Technical Support Product Specialist",
      "resume.exp4.date": "2019 - 2021",
      "resume.exp4.company": "MULTIPLUS CARD, Presidente Prudente, SP",
      "resume.exp4.bullet1": "Provided remote technical support for ERP (Max System Posto) and TEF (TEF Plus) software on a 12x36 schedule, ensuring uninterrupted system availability for resellers, partners, and end-users.",
      "resume.exp4.bullet2": "Led incident management processes, performing root cause analysis and applying timely resolutions, which minimized downtime and improved overall service reliability.",
      "resume.exp4.bullet3": "Documented recurring software issues and collaborated closely with the development team, resulting in long-term system improvements and enhanced user experience.",
      "resume.exp4.bullet4": "Served as the primary escalation point for high-complexity cases, handling advanced troubleshooting and ensuring effective communication between technical teams and customers.",

      "portfolio.heading": "Portfolio",
      "portfolio.description": "Sometimes I study on my own and develop something. Some of these projects I publish as products, while others remain as personal knowledge. Below, you can see the ones I have published. For other projects, feel free to check out my GitHub or contact me.",
      "portfolio.filter.all": "All",
      "portfolio.filter.web": "Web Systems",
      "portfolio.filter.app": "App",
      "portfolio.filter.presentation": "Presentations",
      "portfolio.filter.article": "Article",

      "portfolio.clientsHeading": "Client Sites",
      "portfolio.clientsIntro": "Business sites and admin systems built for real clients, plus reusable templates ready to launch for new ones.",
      "portfolio.projectsHeading": "Projects",
      "portfolio.projectsIntro": "Apps, articles, and presentations I built or wrote on my own.",
      "portfolio.visitSite": "Visit site",
      "portfolio.goalsLabel": "Goal:",

      "portfolio.lumuscare.title": "Lumus Care",
      "portfolio.lumuscare.desc": "Management system for home-healthcare clinics — helps small clinics schedule visits, track client records, manage professional availability, and handle billing in one place. Built with .NET 9, Vue 3, and MySQL using Clean Architecture and CQRS. Private client project.",
      "portfolio.lumuscare.goal": "Give small home-healthcare clinics one place to manage scheduling, records, and billing instead of juggling spreadsheets and paper.",
      "portfolio.inara.title": "Inara Studio Tee",
      "portfolio.inara.desc": "Public site for a tattoo studio to showcase its work and win new clients — admin-managed gallery, collections, client showcase, and a WhatsApp-based quote request flow. Built with .NET 9, Vue 3, and MySQL. Private client project.",
      "portfolio.inara.goal": "Turn studio visitors into booked clients through a gallery that showcases real work and a one-tap WhatsApp quote request.",
      "portfolio.revestidos.title": "Revestidos de Graça",
      "portfolio.revestidos.desc": "Reusable e-commerce template for small apparel brands — product catalog with size/color variants, blog with care tips, and a sales dashboard, all editable from a custom admin panel (shown here with sample data). Built with .NET 9, Vue 3, and MySQL.",
      "portfolio.revestidos.goal": "Let a small apparel brand launch a working online store without hiring a developer or paying for a monthly SaaS platform.",
      "portfolio.salao.title": "Beauty Salon Template",
      "portfolio.salao.desc": "Reusable site template for beauty salons — work gallery, service list, team, and testimonials, all editable from a custom admin panel without touching code. Built with .NET 9, Vue 3, and MySQL.",
      "portfolio.salao.goal": "Give any beauty salon a professional site — gallery, services, and testimonials — ready to launch and manage without touching code.",
      "portfolio.estetica.title": "Car Detailing Template",
      "portfolio.estetica.desc": "Reusable site template for car detailing shops — services with pricing, recommended products, maintenance tips, and gallery, all editable from a custom admin panel. Built with .NET 9, Vue 3, and MySQL.",
      "portfolio.estetica.goal": "Give any car detailing shop a professional site — services, pricing, and gallery — ready to launch and manage without touching code.",
      "portfolio.personal.title": "Personal Trainer Template",
      "portfolio.personal.desc": "Reusable site template for personal trainers — services, a training tips blog, staff profiles, service locations, and testimonials, all editable from a custom admin panel. Built with .NET 9, Vue 3, and MySQL.",
      "portfolio.personal.goal": "Give any personal trainer a professional site — services, blog, and testimonials — ready to launch and manage without touching code.",
      "portfolio.eununca.title": "Eu Nunca",
      "portfolio.eununca.desc": "The digital version of the famous \"Never Have I Ever\" game, designed for 2 or more players. It features a series of questions in various categories that players must answer honestly.",
      "portfolio.advisor.title": "The Advisor",
      "portfolio.advisor.desc": "Your pocket-sized source of brilliantly bad advice.",
      "portfolio.advisor.desc2": "Receive the best worst advice in 4 languages.",
      "portfolio.azure.title": "A Brief Introduction to Microsoft Azure - Feb/2024",
      "portfolio.azure.desc": "Summary of Azure Functionality",
      "portfolio.azure.note": "Developed during the Postgraduate Specialization in Web Applications Development. Note: This document was written in Portuguese.",
      "portfolio.pandemic.title": "The Contribution of the Pandemic to the Adoption of Remote Work - Dec/2022",
      "portfolio.pandemic.desc": "How Covid-19 Accelerated the Adoption of Remote Work",
      "portfolio.pandemic.note": "Developed as the final project for the postgraduate course in Web Technologies and Innovations. Note: This document was written in Portuguese.",
      "portfolio.encryption.title": "The Use of Encryption for Data Protection - Dec/2017",
      "portfolio.encryption.desc": "How Encryption Works, Its Advantages and Disadvantages",
      "portfolio.encryption.note": "Developed based on materials studied during undergraduate education. Note: This document was written in Portuguese.",

      "footer.cv": "Download Updated CV (PDF)",
      "footer.copyright": "© 2026 Lucas Lanza. All rights reserved.",

      "contact.heading": "Contact",
      "contact.description": "Have a project in mind or want to know more about my work? Reach out through any of the channels below.",
      "contact.emailLabel": "Email",
    },

    pt: {
      "meta.home.title": "Lucas Lanza | Vitrine de Projetos",
      "meta.home.description": "Conheça os projetos de software do Lucas Lanza — sistemas full-stack em .NET e Flutter, construídos para clientes e produtos reais. Entre em contato.",
      "meta.perfil.title": "Lucas Lanza | Currículo & Experiência",
      "meta.perfil.description": "Currículo do Lucas Lanza — mais de quatro anos de experiência full-stack em .NET, Flutter e integrações de API. Habilidades, formação e histórico profissional.",

      "nav.home": "Início",
      "nav.about": "Sobre",
      "nav.skills": "Habilidades",
      "nav.resume": "Currículo",
      "nav.portfolio": "Portfólio",
      "nav.contact": "Contato",
      "nav.perfil": "Perfil",

      "hero.prefix": "Eu sou",
      "hero.typedFallback": "Engenheiro de Software .NET",
      "hero.intro": "Construo sistemas web e aplicativos full-stack. Confira os projetos abaixo ou entre em contato.",

      "about.heading": "Sobre Mim",
      "about.p1": "Sou um Engenheiro de Software atualmente em processo de mudança para os EUA, com mais de quatro anos de experiência em desenvolvimento full-stack, especializado em .NET, Flutter e integrações de API. Apaixonado por resolução de problemas e otimização de sistemas, já trabalhei tanto com sistemas legados quanto modernos — melhorando performance, automatizando processos e aprimorando a experiência do usuário.",
      "about.p2": "Além do trabalho profissional, estou sempre explorando novas tecnologias como computação em nuvem e automação.",
      "about.subheading": "Engenheiro de Software .NET.",
      "about.birthdayLabel": "Nascimento:",
      "about.birthdayValue": "11 de maio de 1995",
      "about.phoneLabel": "Telefone:",
      "about.cityLabel": "Cidade:",
      "about.cityValue": "Presidente Prudente/SP, BRASIL",
      "about.linkedinLabel": "LinkedIn:",
      "about.emailLabel": "E-mail:",
      "about.moveAbroadLabel": "Mudança para o exterior:",
      "about.moveAbroadValue": "Disponível para relocação",

      "skills.heading": "Habilidades",
      "skills.description": "Exploro diversas tecnologias em projetos desafiadores e de impacto, sempre buscando aprendizado contínuo e crescimento profissional. Abaixo estão algumas das principais ferramentas e tecnologias com que já trabalhei em aplicações reais:",
      "skills.dotnet.title": ".NET Framework & .NET Core",
      "skills.dotnet.desc": "Mais de 4 anos de experiência construindo sistemas internos, incluindo integrações de pagamento, módulos de agendamento e ferramentas de relatórios dinâmicos em ambientes corporativos.",
      "skills.flutter.title": "Flutter",
      "skills.flutter.desc": "Mais de 3 anos de experiência criando apps multiplataforma com animações elaboradas, armazenamento com Hive, integração com AdSense e mecânicas de jogo personalizadas para projetos pessoais e de clientes.",
      "skills.sql.title": "SQL Server & Informix",
      "skills.sql.desc": "Mais de 4 anos trabalhando com queries complexas, otimização de banco de dados e integrações de sistemas em ambientes críticos como educação e sistemas financeiros.",
      "skills.bootstrap.title": "Bootstrap",
      "skills.bootstrap.desc": "Desenvolvimento de layouts responsivos, dashboards e interfaces orientadas a dados integradas com Razor Pages e DataTables em painéis administrativos e portais públicos.",
      "skills.js.title": "JavaScript & jQuery",
      "skills.js.desc": "Usado para aprimorar o comportamento de UI/UX em formulários dinâmicos, validações em tempo real e interações de tabelas dentro de aplicações .NET complexas e componentes personalizados.",
      "skills.razor.title": "Razor Pages & C#",
      "skills.razor.desc": "Experiência construindo módulos web de fácil manutenção com padrões de arquitetura limpa, focando em manutenibilidade e extensibilidade em plataformas educacionais.",

      "resume.heading": "Currículo",
      "resume.description": "Com anos de experiência em desenvolvimento de software, sou apaixonado por criar soluções inovadoras que otimizam processos e impactam positivamente negócios e usuários.",
      "resume.educationTitle": "Formação Acadêmica",
      "resume.activitiesTitle": "Atividades",
      "resume.experienceTitle": "Experiência Profissional",

      "resume.edu1.title": "Especialização em Desenvolvimento de Aplicações Web",
      "resume.edu1.date": "2022 - 2024",
      "resume.edu1.school": "UNOESTE, Universidade do Oeste Paulista",
      "resume.edu2.title": "Pós-graduação em Tecnologias e Inovações Web",
      "resume.edu2.date": "2021 - 2022",
      "resume.edu2.school": "Faculdade Venda Nova do Imigrante (FAVENI)",
      "resume.edu3.title": "Bacharelado em Sistemas de Informação",
      "resume.edu3.date": "2013 - 2016",
      "resume.edu3.school": "UNOESTE, Universidade do Oeste Paulista",

      "resume.activity1": "Certificação Microsoft: Azure Fundamentals (AZ-900)",
      "resume.activity2": "Desenvolvi o app \"Eu Nunca\", uma versão web do jogo \"Eu Nunca\" com integração de AdSense e Firebase.",
      "resume.activity3": "Desenvolvi o app \"Adviser\", um app que dá os piores/melhores conselhos.",

      "resume.exp1.title": "Sr Analyst II Software Engineering",
      "resume.exp1.date": "Novembro de 2025 - Atual",
      "resume.exp1.company": "DXC Technology, Remoto",
      "resume.exp1.bullet1": "Atuo no desenvolvimento de projetos e na sustentação de aplicações de forma totalmente remota, entregando novas funcionalidades e resolvendo problemas em produção para clientes corporativos.",
      "resume.exp1.bullet2": "Colaboro com times multidisciplinares em todo o ciclo de desenvolvimento de software, desde a análise de requisitos até o deploy e o suporte pós-lançamento.",

      "resume.exp2.title": "Analista de Sistemas",
      "resume.exp2.date": "2023 - Novembro de 2025",
      "resume.exp2.company": "UNOESTE, Universidade do Oeste Paulista, Presidente Prudente, SP",
      "resume.exp2.bullet1": "Desenvolvi um módulo de pagamento de estacionamento para alunos e funcionários usando .NET 6.0, Bootstrap e Flutter, integrado a uma API de pagamentos. O sistema processa aproximadamente 700 veículos por mês e gera uma receita mensal média de R$5.000.",
      "resume.exp2.bullet2": "Implementei um sistema de denúncia de assédio totalmente anônimo integrado à plataforma interna da universidade, construído com .NET Framework 4.5. O módulo garante a confidencialidade dos funcionários e gera protocolos de atendimento automaticamente.",
      "resume.exp2.bullet3": "Construí o sistema de envio de documentos \"Consulta TCE\", usando .NET Core, integrado a um Sistema de Gestão Eletrônica de Documentos (GED). Isso eliminou a necessidade de formulários impressos, processando quase 5.000 documentos de 1.000 alunos em 7 cursos, melhorando a validação de documentos para parceiros institucionais.",
      "resume.exp2.bullet4": "Criei um sistema desktop de Totem de Autoatendimento com funcionalidades client-side, acesso restrito a conteúdo e registro de atividades via Elasticsearch, aumentando a autonomia do usuário e a transparência operacional.",
      "resume.exp2.bullet5": "Gerenciei a manutenção e os deploys contínuos do sistema, corrigindo bugs, analisando a viabilidade de novas funcionalidades e aplicando melhorias de performance para otimizar o comportamento do sistema.",
      "resume.exp2.bullet6": "Otimizei e desenvolvi queries SQL em bancos de dados Informix e SQL Server, resultando em recuperação de dados mais rápida e melhor performance da aplicação.",

      "resume.exp3.title": "Engenheiro de Software .NET",
      "resume.exp3.date": "2021 - 2023",
      "resume.exp3.company": "COBMAIS, Presidente Prudente, SP",
      "resume.exp3.bullet1": "Prestei suporte técnico de Nível 2 (Tier 2), resolvendo bugs complexos, corrigindo inconsistências de banco de dados e ajustando integrações de API/WebService. Atuei como ponte entre o suporte de Nível 1 e o time de desenvolvimento, tratando efetivamente mais de 2.000 chamados escalados, incluindo problemas críticos de produção.",
      "resume.exp3.bullet2": "Colaborei com times de desenvolvimento de clientes para diagnosticar e resolver problemas de integração, garantindo a implantação bem-sucedida de mais de 15 integrações de API de terceiros.",
      "resume.exp3.bullet3": "Mentorei engenheiros de suporte júnior, fornecendo orientação técnica e conhecimento de processos, o que reduziu significativamente o tempo de resolução de chamados e melhorou a eficiência do time.",
      "resume.exp3.bullet4": "Criei e ministrei um programa completo de treinamento sobre o banco de dados interno de Stage, com 105 participantes e 65 conclusões, capacitando novos funcionários e clientes a usar melhor os recursos do sistema.",
      "resume.exp3.bullet5": "Liderei o desenvolvimento de uma versão beta de \"Extrações de Dados Dinâmicas\", combinando JS Flexmonster, práticas de ETL e queries SQL otimizadas para melhorar relatórios e acessibilidade de dados.",

      "resume.exp4.title": "Especialista em Suporte Técnico de Produto",
      "resume.exp4.date": "2019 - 2021",
      "resume.exp4.company": "MULTIPLUS CARD, Presidente Prudente, SP",
      "resume.exp4.bullet1": "Prestei suporte técnico remoto para os softwares ERP (Max System Posto) e TEF (TEF Plus) em escala 12x36, garantindo disponibilidade ininterrupta do sistema para revendedores, parceiros e usuários finais.",
      "resume.exp4.bullet2": "Liderei processos de gestão de incidentes, realizando análise de causa raiz e aplicando soluções ágeis, o que minimizou o tempo de inatividade e melhorou a confiabilidade geral do serviço.",
      "resume.exp4.bullet3": "Documentei problemas recorrentes de software e colaborei de perto com o time de desenvolvimento, resultando em melhorias de longo prazo no sistema e melhor experiência do usuário.",
      "resume.exp4.bullet4": "Atuei como ponto principal de escalonamento para casos de alta complexidade, conduzindo troubleshooting avançado e garantindo comunicação eficaz entre times técnicos e clientes.",

      "portfolio.heading": "Portfólio",
      "portfolio.description": "Às vezes estudo por conta própria e desenvolvo algo. Alguns desses projetos eu publico como produtos, enquanto outros permanecem como conhecimento pessoal. Abaixo, você pode ver os que já publiquei. Para outros projetos, fique à vontade para conferir meu GitHub ou entrar em contato.",
      "portfolio.filter.all": "Todos",
      "portfolio.filter.web": "Sistemas Web",
      "portfolio.filter.app": "Apps",
      "portfolio.filter.presentation": "Apresentações",
      "portfolio.filter.article": "Artigo",

      "portfolio.clientsHeading": "Sites para Clientes",
      "portfolio.clientsIntro": "Sites institucionais e sistemas administrativos construídos para clientes reais, além de templates reutilizáveis prontos para lançar para novos clientes.",
      "portfolio.projectsHeading": "Projetos",
      "portfolio.projectsIntro": "Apps, artigos e apresentações que fiz ou escrevi por conta própria.",
      "portfolio.visitSite": "Visitar site",
      "portfolio.goalsLabel": "Objetivo:",

      "portfolio.lumuscare.title": "Lumus Care",
      "portfolio.lumuscare.desc": "Sistema de gestão para clínicas de saúde domiciliar — ajuda pequenas clínicas a agendar visitas, gerenciar prontuário de clientes, disponibilidade de profissionais e faturamento em um só lugar. Construído com .NET 9, Vue 3 e MySQL usando Clean Architecture e CQRS. Projeto privado de cliente.",
      "portfolio.lumuscare.goal": "Dar a pequenas clínicas de home care um único lugar para gerenciar agendamento, prontuário e faturamento, sem depender de planilhas e papel.",
      "portfolio.inara.title": "Inara Studio Tee",
      "portfolio.inara.desc": "Site público para um estúdio de tatuagem divulgar seus trabalhos e conquistar novos clientes — galeria gerenciada pelo admin, coleções, vitrine de clientes e fluxo de cotação via WhatsApp. Construído com .NET 9, Vue 3 e MySQL. Projeto privado de cliente.",
      "portfolio.inara.goal": "Transformar visitantes do site em clientes agendados, através de uma galeria que mostra o trabalho real e um pedido de orçamento via WhatsApp em um clique.",
      "portfolio.revestidos.title": "Revestidos de Graça",
      "portfolio.revestidos.desc": "Template reutilizável de e-commerce para pequenas marcas de roupas — catálogo de produtos com variantes de tamanho/cor, blog com dicas de cuidado e dashboard de vendas, tudo editável por um painel admin próprio (exibido aqui com dados fictícios). Construído com .NET 9, Vue 3 e MySQL.",
      "portfolio.revestidos.goal": "Permitir que uma pequena marca de roupas coloque uma loja online no ar sem contratar um desenvolvedor ou pagar por uma plataforma SaaS mensal.",
      "portfolio.salao.title": "Template para Salão de Beleza",
      "portfolio.salao.desc": "Template reutilizável para salões de beleza — galeria de trabalhos, lista de serviços, equipe e depoimentos, tudo editável por um painel admin próprio sem mexer em código. Construído com .NET 9, Vue 3 e MySQL.",
      "portfolio.salao.goal": "Dar a qualquer salão de beleza um site profissional — galeria, serviços e depoimentos — pronto para lançar e gerenciar sem mexer em código.",
      "portfolio.estetica.title": "Template para Estética Automotiva",
      "portfolio.estetica.desc": "Template reutilizável para estéticas automotivas — serviços com preço, produtos recomendados, dicas de manutenção e galeria, tudo editável por um painel admin próprio. Construído com .NET 9, Vue 3 e MySQL.",
      "portfolio.estetica.goal": "Dar a qualquer estética automotiva um site profissional — serviços, preços e galeria — pronto para lançar e gerenciar sem mexer em código.",
      "portfolio.personal.title": "Template para Personal Trainer",
      "portfolio.personal.desc": "Template reutilizável para personal trainers — serviços, blog de dicas de treino, perfil dos profissionais, locais de atendimento e depoimentos, tudo editável por um painel admin próprio. Construído com .NET 9, Vue 3 e MySQL.",
      "portfolio.personal.goal": "Dar a qualquer personal trainer um site profissional — serviços, blog e depoimentos — pronto para lançar e gerenciar sem mexer em código.",
      "portfolio.eununca.title": "Eu Nunca",
      "portfolio.eununca.desc": "A versão digital do famoso jogo \"Eu Nunca\", pensado para 2 ou mais jogadores. Traz uma série de perguntas em várias categorias que os jogadores devem responder com sinceridade.",
      "portfolio.advisor.title": "The Advisor",
      "portfolio.advisor.desc": "Sua fonte de bolso de conselhos brilhantemente ruins.",
      "portfolio.advisor.desc2": "Receba os piores/melhores conselhos em 4 idiomas.",
      "portfolio.azure.title": "Uma Breve Introdução ao Microsoft Azure - Fev/2024",
      "portfolio.azure.desc": "Resumo das funcionalidades do Azure",
      "portfolio.azure.note": "Desenvolvido durante a Pós-graduação em Desenvolvimento de Aplicações Web. Obs.: este documento foi escrito em português.",
      "portfolio.pandemic.title": "A Contribuição da Pandemia para a Adoção do Trabalho Remoto - Dez/2022",
      "portfolio.pandemic.desc": "Como a Covid-19 acelerou a adoção do trabalho remoto",
      "portfolio.pandemic.note": "Desenvolvido como projeto final do curso de pós-graduação em Tecnologias e Inovações Web. Obs.: este documento foi escrito em português.",
      "portfolio.encryption.title": "O Uso de Criptografia para Proteção de Dados - Dez/2017",
      "portfolio.encryption.desc": "Como a criptografia funciona, suas vantagens e desvantagens",
      "portfolio.encryption.note": "Desenvolvido com base em materiais estudados durante a graduação. Obs.: este documento foi escrito em português.",

      "footer.cv": "Baixar Currículo Atualizado (PDF)",
      "footer.copyright": "© 2026 Lucas Lanza. Todos os direitos reservados.",

      "contact.heading": "Contato",
      "contact.description": "Tem um projeto em mente ou quer saber mais sobre meu trabalho? Entre em contato por qualquer um dos canais abaixo.",
      "contact.emailLabel": "E-mail",
    },
  };

  function detectInitialLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dict[saved]) return saved;

    const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return browserLang.startsWith("pt") ? "pt" : "en";
  }

  let typedInstance = null;

  function reinitTyped(lang) {
    const el = document.querySelector(".typed");
    if (!el || typeof Typed === "undefined") return;

    const items = lang === "pt"
      ? ["Desenvolvedor .NET", "Analista de Sistemas", "Brasileiro", "Viajante"]
      : [".NET Developer", "System Analyst", "Brazilian", "Traveler"];

    if (typedInstance) {
      typedInstance.destroy();
    }
    el.textContent = dict[lang]["hero.typedFallback"];
    typedInstance = new Typed(".typed", {
      strings: items,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  function applyLanguage(lang) {
    if (!dict[lang]) lang = "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[lang][key];
      if (value !== undefined) el.textContent = value;
    });

    const page = document.body.dataset.page || "home";
    document.title = dict[lang][`meta.${page}.title`];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict[lang][`meta.${page}.description`]);

    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
    reinitTyped(lang);
  }

  function initLanguageSwitcher() {
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang")));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(detectInitialLanguage());
    initLanguageSwitcher();
  });
})();
