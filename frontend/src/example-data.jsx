export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const exampleData = {
  personalInfo: {
    fullName: "Josephine Meyers",
    email: "josephine.meyers@mail.co.uk",
    phoneNumber: "+44 3245 5521 5521",
    address: "London, UK",
  },

  sections: {
    educations: [
      {
        degree: "Bachelors in Economics",
        schoolName: "London City University",
        location: "New York City, US",
        startDate: "08/2020",
        endDate: "present",
        isCollapsed: true,
        isHidden: false,
        id: generateUniqueId(),
      },
      {
        degree: "Master's Degree in Math",
        schoolName: "Hidden University",
        location: "New York City, US",
        startDate: "08/2020",
        endDate: "present",
        isCollapsed: true,
        isHidden: true,
        id: generateUniqueId(),
      },
    ],

    experiences: [
      {
        companyName: "Umbrella Inc.",
        positionTitle: "UX & UI Designer",
        location: "New York City, US",
        description:
          "Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications-sector to mobile games for IOS and Android",
        startDate: "08/2020",
        endDate: "present",
        isCollapsed: true,
        isHidden: false,
        id: generateUniqueId(),
      },
      {
        companyName: "Black Mesa Labs",
        positionTitle: "UX Research Assistant",
        location: "Berlin, Germany",
        description:
          "Supported senior researchers on accessibility standards for the open web. Created and usability tested wireframes and prototypes. Produced interactive documentation for quick onboarding of new researchers.",
        startDate: "04/2018",
        endDate: "02/2019",
        isCollapsed: true,
        isHidden: false,
        id: generateUniqueId(),
      },
      {
        companyName: "Wayfarer Technologies",
        positionTitle: "Product Manager Intern",
        location: "London, UK",
        description:
          "Worked with cross-functional teams to launch an AI-based recommendation engine for e-commerce platforms, achieving a 15% increase in customer retention.",
        startDate: "06/2019",
        endDate: "08/2019",
        isCollapsed: true,
        isHidden: false,
        id: generateUniqueId(),
      },
      {
        companyName: "Solaris AI",
        positionTitle: "Junior Data Analyst",
        location: "Paris, France",
        description:
          "Analyzed large datasets to derive actionable insights, developed automated reporting pipelines, and visualized key metrics for stakeholders.",
        startDate: "01/2023",
        endDate: "11/2023",
        isCollapsed: true,
        isHidden: false,
        id: generateUniqueId(),
      },
    ],
  },
};

export default exampleData;
