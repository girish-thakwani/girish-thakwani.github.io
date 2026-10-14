// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "PROJECTS",
          description: "Selected research and academic projects",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Download my resume using the button above.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-started-my-ms-in-artificial-intelligence-amp-amp-innovation-at-carnegie-mellon-university",
          title: 'Started my MS in Artificial Intelligence &amp;amp;amp; Innovation at Carnegie Mellon University.',
          description: "",
          section: "News",},{id: "news-presented-the-web-graph-project-as-a-poster-to-the-school-of-computer-science-at-cmu",
          title: 'Presented the web graph project as a poster to the School of Computer...',
          description: "",
          section: "News",},{id: "news-presented-the-hallucination-detection-project-as-a-poster-to-the-school-of-computer-science-at-cmu",
          title: 'Presented the hallucination detection project as a poster to the School of Computer...',
          description: "",
          section: "News",},{id: "news-joined-apple-as-a-machine-learning-intern-on-the-applied-machine-learning-team",
          title: 'Joined Apple as a Machine Learning Intern on the Applied Machine Learning team....',
          description: "",
          section: "News",},{id: "projects-zulipgpt-llm-integration-for-chat-summarization-in-open-source-messaging",
          title: 'ZulipGPT: LLM Integration for Chat Summarization in Open-Source Messaging',
          description: "Privacy-safe chat and inbox summarization for the Zulip open-source messaging platform",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-real-time-movie-recommendation-platform",
          title: 'Real-Time Movie Recommendation Platform',
          description: "Low-latency movie recommender with automated retraining, monitoring, and A/B testing",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_music_recommendations/";
            },},{id: "projects-graphact-graph-structured-action-prediction-for-web-agents",
          title: 'GraphAct: Graph-Structured Action Prediction for Web Agents',
          description: "A DOM graph transformer fused into Qwen3-VL with LoRA to fix element grounding on Multimodal Mind2Web",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research_graphact/";
            },},{id: "projects-multilingual-hallucination-probes-do-english-correctness-probes-transfer-across-languages",
          title: 'Multilingual Hallucination Probes: Do English Correctness Probes Transfer Across Languages?',
          description: "Zero-shot cross-lingual hallucination detection by probing Qwen2.5-7B hidden states",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research_multilingual_hallucination/";
            },},{id: "projects-outcome-aware-web-agents-does-predicting-page-transitions-help-vlm-action-selection",
          title: 'Outcome-Aware Web Agents: Does Predicting Page Transitions Help VLM Action Selection?',
          description: "Controlled SFT study of outcome-aware supervision on Qwen3-VL for Multimodal Mind2Web",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research_outcome_aware/";
            },},{id: "projects-prism-probing-routed-information-flow-via-structured-multimodal-bottlenecks",
          title: 'PRISM: Probing Routed Information Flow via Structured Multimodal Bottlenecks',
          description: "Hierarchical multimodal fusion study on CMU-MOSEI/MOSI",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research_prism/";
            },},{id: "projects-scleranext-lightweight-cnn-segmentation-for-real-time-biometric-identification",
          title: 'ScleraNext: Lightweight CNN Segmentation for Real-Time Biometric Identification',
          description: "Real-time iris/retinal segmentation optimized for edge deployment",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research_sclera/";
            },},{id: "projects-steelrag-hybrid-sparse-dense-retrieval-over-a-crawled-local-knowledge-corpus",
          title: 'SteelRAG: Hybrid Sparse-Dense Retrieval over a Crawled Local Knowledge Corpus',
          description: "Hybrid BM25 + dense retrieval over a curated local corpus",
          section: "Projects",handler: () => {
              window.location.href = "/projects/steelrag/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("https://drive.google.com/file/d/1NzU8DMzGB0oSgwaqWZnkl9ZeA1rvjdyV/view?usp=drive_link", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%72%61%6D%6E%61%74%68@%61%6E%64%72%65%77.%63%6D%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/mrunalini-ramnath", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/mrunalinir", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
